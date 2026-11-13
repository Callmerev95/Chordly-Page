import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Languages,
  Loader2,
  Minus,
  Music2,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { EqualizerBars } from './MotionPrimitives';
import {
  buildDynamicWordSlots,
  fetchIlysbFromLrclib,
  fetchIlysbItunesPreview,
  type SyncedLyricLine,
} from '../utils/lyricsService';

type PlaybackStatus = 'loading' | 'ready' | 'playing' | 'paused' | 'ended' | 'error';

interface AudioAnalyserEngine {
  ctx: AudioContext;
  source: MediaElementAudioSourceNode;
  gainNode: GainNode;
  vocalAnalyser: AnalyserNode;
  bassAnalyser: AnalyserNode;
  vocalFreqData: Uint8Array<ArrayBuffer>;
  bassFreqData: Uint8Array<ArrayBuffer>;
}

const ACCENT_COLOR = '#FF2D55';
const REFF_2_ANCHOR_SEC = 96.4;
const DEFAULT_SYNC_OFFSET = -0.75;
const MAX_VISIBLE_LINES = 4;
const ILYSB_BEAT_PERIOD_SEC = 60 / 115; // Fallback ~115 BPM chorus groove
const MIN_SYNC_OFFSET = -4.0;
const MAX_SYNC_OFFSET = 4.0;
const SYNC_STEP = 0.25;

function formatClock(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatOffset(offsetSec: number): string {
  if (Math.abs(offsetSec) < 0.01) return '0.0s';
  const sign = offsetSec > 0 ? '+' : '';
  return `${sign}${offsetSec.toFixed(2).replace(/\.00$/, '.0')}s`;
}

function readAnalyserNormalized(
  analyser: AnalyserNode,
  buffer: Uint8Array<ArrayBuffer>
): number {
  analyser.getByteFrequencyData(buffer);
  let sumSq = 0;
  for (let i = 0; i < buffer.length; i++) {
    const norm = buffer[i] / 255;
    sumSq += norm * norm;
  }
  return Math.sqrt(sumSq / Math.max(1, buffer.length));
}

export const FocusLyricStage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const [lines, setLines] = useState<SyncedLyricLine[]>([]);
  const [lyricsOrigin, setLyricsOrigin] = useState<'lrclib' | 'fallback'>('lrclib');
  const [artworkUrl, setArtworkUrl] = useState<string>('');
  const [artworkFailed, setArtworkFailed] = useState(false);

  const [itunesUrl, setItunesUrl] = useState<string>('');
  const [corsEnabled, setCorsEnabled] = useState<boolean>(true);
  const [hasLiveAnalyser, setHasLiveAnalyser] = useState<boolean>(false);
  const [status, setStatus] = useState<PlaybackStatus>('loading');
  const [audioTimeSec, setAudioTimeSec] = useState<number>(0);
  const [vocalEnergy, setVocalEnergy] = useState<number>(0);
  const [beatEnergy, setBeatEnergy] = useState<number>(0);
  const [audioDurationSec, setAudioDurationSec] = useState<number>(30);
  const [syncOffsetSec, setSyncOffsetSec] = useState<number>(DEFAULT_SYNC_OFFSET);
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioEngineRef = useRef<AudioAnalyserEngine | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const vocalOnsetsRef = useRef<Record<number, number>>({});
  const smoothedVocalRef = useRef<number>(0);
  const smoothedBassRef = useRef<number>(0);
  const vocalFloorRef = useRef<number>(0.08);

  const loadSources = useCallback(async (signal?: AbortSignal) => {
    setStatus('loading');
    const [lrclibRes, itunesRes] = await Promise.all([
      fetchIlysbFromLrclib(signal),
      fetchIlysbItunesPreview(signal),
    ]);

    if (signal?.aborted) return;

    setLines(lrclibRes.lines);
    setLyricsOrigin(lrclibRes.origin);
    setItunesUrl(itunesRes.previewUrl);
    setArtworkUrl(itunesRes.artworkUrl);
    setArtworkFailed(false);
    setStatus('ready');
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadSources(controller.signal);

    return () => {
      controller.abort();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (audioEngineRef.current) {
        void audioEngineRef.current.ctx.close().catch(() => undefined);
        audioEngineRef.current = null;
      }
    };
  }, [loadSources]);

  const ensureAudioEngine = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !corsEnabled) return;

    if (audioEngineRef.current) {
      if (audioEngineRef.current.ctx.state === 'suspended') {
        await audioEngineRef.current.ctx.resume().catch(() => undefined);
      }
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    try {
      const ctx = new AudioCtx();
      const source = ctx.createMediaElementSource(audio);
      const gainNode = ctx.createGain();
      gainNode.gain.value = isMuted ? 0 : Math.max(0, Math.min(1, volume / 100));

      // Keep <audio> element at full internal amplitude so analyser reads true vocal energy even when muted
      audio.volume = 1;
      audio.muted = false;

      // Vocal presence bandpass (350Hz - 2.8kHz) + bass/kick lowpass (<210Hz)
      const vocalFilter = ctx.createBiquadFilter();
      vocalFilter.type = 'bandpass';
      vocalFilter.frequency.value = 1250;
      vocalFilter.Q.value = 0.75;

      const bassFilter = ctx.createBiquadFilter();
      bassFilter.type = 'lowpass';
      bassFilter.frequency.value = 210;
      bassFilter.Q.value = 0.7;

      const vocalAnalyser = ctx.createAnalyser();
      vocalAnalyser.fftSize = 256;
      vocalAnalyser.smoothingTimeConstant = 0.42;

      const bassAnalyser = ctx.createAnalyser();
      bassAnalyser.fftSize = 256;
      bassAnalyser.smoothingTimeConstant = 0.52;

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.connect(vocalFilter);
      vocalFilter.connect(vocalAnalyser);

      source.connect(bassFilter);
      bassFilter.connect(bassAnalyser);

      if (ctx.state === 'suspended') {
        await ctx.resume().catch(() => undefined);
      }

      audioEngineRef.current = {
        ctx,
        source,
        gainNode,
        vocalAnalyser,
        bassAnalyser,
        vocalFreqData: new Uint8Array(new ArrayBuffer(vocalAnalyser.frequencyBinCount)),
        bassFreqData: new Uint8Array(new ArrayBuffer(bassAnalyser.frequencyBinCount)),
      };
      setHasLiveAnalyser(true);
    } catch {
      audioEngineRef.current = null;
      setHasLiveAnalyser(false);
    }
  }, [corsEnabled, isMuted, volume]);

  const rawStreamDurationSec = audioDurationSec > 1 ? audioDurationSec : 30;
  const songLyricTime = audioTimeSec + REFF_2_ANCHOR_SEC + syncOffsetSec;

  // Show and play only the first 4 lines of Reff 2
  const visibleLines = useMemo(() => {
    if (lines.length === 0) return [];
    const reff2Lines = lines.filter((l) => l.startSec >= REFF_2_ANCHOR_SEC - 0.4);
    const sourceLines = reff2Lines.length > 0 ? reff2Lines : lines;
    return sourceLines.slice(0, MAX_VISIBLE_LINES);
  }, [lines]);

  // Auto-stop boundary right when line 4 vocal completes
  const clipDurationSec = useMemo(() => {
    const lastLine = visibleLines[visibleLines.length - 1];
    if (!lastLine) return rawStreamDurationSec;
    const targetEnd = lastLine.vocalEndSec - REFF_2_ANCHOR_SEC - syncOffsetSec;
    return Math.max(4, Math.min(rawStreamDurationSec, targetEnd));
  }, [visibleLines, rawStreamDurationSec, syncOffsetSec]);

  const activeLineIndex = useMemo(() => {
    if (visibleLines.length === 0) return 0;
    for (let i = 0; i < visibleLines.length; i++) {
      const line = visibleLines[i];
      if (songLyricTime >= line.startSec && songLyricTime < line.endSec) {
        return i;
      }
    }
    if (songLyricTime >= visibleLines[visibleLines.length - 1].startSec) {
      return visibleLines.length - 1;
    }
    return 0;
  }, [visibleLines, songLyricTime]);

  // Auto-center active line inside viewport container only (never scrolls the page)
  useEffect(() => {
    const container = viewportRef.current;
    const activeEl = lineRefs.current[activeLineIndex];
    if (!container || !activeEl) return;

    const targetTop =
      activeEl.offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;

    container.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [activeLineIndex, prefersReducedMotion, visibleLines.length]);

  // Sync volume & mute to GainNode (when Web Audio is attached) or fallback <audio> element
  useEffect(() => {
    const audio = audioRef.current;
    const engine = audioEngineRef.current;
    const normalizedGain = isMuted || volume === 0 ? 0 : Math.max(0, Math.min(1, volume / 100));

    if (engine) {
      engine.gainNode.gain.setTargetAtTime(normalizedGain, engine.ctx.currentTime, 0.015);
      if (audio) {
        audio.volume = 1;
        audio.muted = false;
      }
      return;
    }

    if (!audio) return;
    audio.volume = normalizedGain;
    audio.muted = normalizedGain === 0;
  }, [volume, isMuted, hasLiveAnalyser]);

  // 60fps hardware clock + real-time vocal-onset gating & audio reactivity loop
  useEffect(() => {
    if (status !== 'playing') {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = () => {
      const audio = audioRef.current;
      if (!audio) return;

      const curAudioTime = audio.currentTime;
      if (curAudioTime >= clipDurationSec) {
        audio.pause();
        audio.currentTime = clipDurationSec;
        setAudioTimeSec(clipDurationSec);
        setVocalEnergy(0);
        setBeatEnergy(0);
        setStatus('ended');
        return;
      }

      let nextVocal = 0;
      let nextBass = 0;
      const engine = audioEngineRef.current;

      if (engine) {
        const rawVocal = readAnalyserNormalized(engine.vocalAnalyser, engine.vocalFreqData);
        const rawBass = readAnalyserNormalized(engine.bassAnalyser, engine.bassFreqData);

        smoothedVocalRef.current = smoothedVocalRef.current * 0.55 + rawVocal * 0.45;
        smoothedBassRef.current = smoothedBassRef.current * 0.6 + rawBass * 0.4;
        nextVocal = smoothedVocalRef.current;
        nextBass = smoothedBassRef.current;

        // Track adaptive instrumental floor slowly so vocal entrances stand out cleanly
        if (nextVocal < vocalFloorRef.current) {
          vocalFloorRef.current = vocalFloorRef.current * 0.9 + nextVocal * 0.1;
        } else {
          vocalFloorRef.current = vocalFloorRef.current * 0.992 + nextVocal * 0.008;
        }
      }

      // Real-time vocal-onset gate: hold line words dim & still during instrumental gaps
      const curSongTime = curAudioTime + REFF_2_ANCHOR_SEC + syncOffsetSec;
      let curIdx = 0;
      for (let i = 0; i < visibleLines.length; i++) {
        const l = visibleLines[i];
        if (curSongTime >= l.startSec && curSongTime < l.endSec) {
          curIdx = i;
          break;
        }
        if (i === visibleLines.length - 1 && curSongTime >= l.startSec) {
          curIdx = i;
        }
      }

      const curLine = visibleLines[curIdx];
      if (curLine && curSongTime >= curLine.startSec && vocalOnsetsRef.current[curIdx] === undefined) {
        const waitElapsed = curSongTime - curLine.startSec;

        if (engine) {
          const vocalThreshold = Math.max(0.085, vocalFloorRef.current * 1.28);
          const vocalTriggered =
            waitElapsed >= curLine.minGateWaitSec &&
            nextVocal >= vocalThreshold &&
            nextVocal >= nextBass * 0.48;

          if (vocalTriggered) {
            vocalOnsetsRef.current[curIdx] = curSongTime;
          } else if (waitElapsed >= curLine.maxGateWaitSec) {
            vocalOnsetsRef.current[curIdx] = curLine.startSec + curLine.vocalDelaySec;
          }
        } else if (waitElapsed >= curLine.vocalDelaySec) {
          vocalOnsetsRef.current[curIdx] = curLine.startSec + curLine.vocalDelaySec;
        }
      }

      setAudioTimeSec(curAudioTime);
      setVocalEnergy(nextVocal);
      setBeatEnergy(nextBass);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [status, clipDurationSec, syncOffsetSec, visibleLines]);

  const handleTogglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !itunesUrl || status === 'loading') return;

    if (status === 'playing') {
      audio.pause();
      setStatus('paused');
      return;
    }

    if (status === 'ended' || audio.currentTime >= clipDurationSec - 0.1) {
      audio.currentTime = 0;
      setAudioTimeSec(0);
      vocalOnsetsRef.current = {};
      vocalFloorRef.current = 0.08;
    }

    await ensureAudioEngine();

    try {
      await audio.play();
      setStatus('playing');
    } catch {
      setStatus('error');
    }
  }, [itunesUrl, status, clipDurationSec, ensureAudioEngine]);

  const handleSeekToLine = useCallback(
    async (index: number) => {
      const line = visibleLines[index];
      const audio = audioRef.current;
      if (!line || !audio || !itunesUrl) return;

      const rawTarget = line.startSec - REFF_2_ANCHOR_SEC - syncOffsetSec;
      const clampedTarget = Math.max(0, Math.min(clipDurationSec - 0.3, rawTarget));

      vocalOnsetsRef.current = {};
      vocalFloorRef.current = 0.08;
      audio.currentTime = clampedTarget;
      setAudioTimeSec(clampedTarget);

      await ensureAudioEngine();

      try {
        await audio.play();
        setStatus('playing');
      } catch {
        setStatus('paused');
      }
    },
    [visibleLines, itunesUrl, syncOffsetSec, clipDurationSec, ensureAudioEngine]
  );

  const handleScrub = useCallback(
    (nextTimeSec: number) => {
      const audio = audioRef.current;
      if (!audio || !itunesUrl) return;

      const clamped = Math.max(0, Math.min(clipDurationSec - 0.15, nextTimeSec));
      vocalOnsetsRef.current = {};
      audio.currentTime = clamped;
      setAudioTimeSec(clamped);
      if (status === 'ended') {
        setStatus('paused');
      }
    },
    [itunesUrl, clipDurationSec, status]
  );

  const handleVolumeChange = useCallback((nextVolume: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(nextVolume)));
    setVolume(clamped);
    setIsMuted(clamped === 0);
  }, []);

  const handleToggleMute = useCallback(() => {
    if (isMuted || volume === 0) {
      setVolume(volume === 0 ? 50 : volume);
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const handleAdjustSync = useCallback((delta: number) => {
    vocalOnsetsRef.current = {};
    setSyncOffsetSec((prev) => {
      const next = Math.round((prev + delta) * 100) / 100;
      return Math.max(MIN_SYNC_OFFSET, Math.min(MAX_SYNC_OFFSET, next));
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(visibleLines.length - 1, activeLineIndex + 1);
        void handleSeekToLine(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(0, activeLineIndex - 1);
        void handleSeekToLine(prev);
      }
    },
    [visibleLines.length, activeLineIndex, handleSeekToLine]
  );

  const isPlaying = status === 'playing';
  const isEnded = status === 'ended';
  const effectiveVolume = isMuted ? 0 : volume;
  const elapsed = Math.max(0, Math.min(clipDurationSec, audioTimeSec));
  const progressPct = clipDurationSec > 0 ? (elapsed / clipDurationSec) * 100 : 0;

  // Fallback beat-pulse envelope (~115 BPM) when live analyser is not active
  const beatPhase =
    ((Math.max(0, songLyricTime - 96.57) % ILYSB_BEAT_PERIOD_SEC) /
      ILYSB_BEAT_PERIOD_SEC);
  const fallbackPulse = isPlaying ? Math.pow(Math.max(0, 1 - beatPhase * 1.35), 2) : 0;
  const reactivePulse = isPlaying
    ? hasLiveAnalyser
      ? Math.min(1, vocalEnergy * 1.25 + beatEnergy * 0.38)
      : fallbackPulse
    : 0;

  return (
    <div
      onKeyDown={handleKeyDown}
      className="relative overflow-hidden rounded-xl space-y-3"
    >
      {/* Hidden native HTML5 audio element with CORS enabled for Web Audio vocal-energy analysis */}
      <audio
        ref={audioRef}
        src={itunesUrl || undefined}
        crossOrigin={corsEnabled ? 'anonymous' : undefined}
        preload="auto"
        onLoadedMetadata={(e) => {
          const dur = e.currentTarget.duration;
          if (Number.isFinite(dur) && dur > 0) {
            setAudioDurationSec(dur);
          }
          e.currentTarget.currentTime = 0;
          setAudioTimeSec(0);
          setStatus('ready');
        }}
        onTimeUpdate={(e) => {
          if (status === 'playing' && e.currentTarget.currentTime >= clipDurationSec) {
            e.currentTarget.pause();
            e.currentTarget.currentTime = clipDurationSec;
            setAudioTimeSec(clipDurationSec);
            setVocalEnergy(0);
            setBeatEnergy(0);
            setStatus('ended');
          }
        }}
        onEnded={() => {
          setAudioTimeSec(clipDurationSec);
          setVocalEnergy(0);
          setBeatEnergy(0);
          setStatus('ended');
        }}
        onError={() => {
          if (corsEnabled && !audioEngineRef.current) {
            // Gracefully downgrade to non-CORS playback with calibrated vocal fallback
            setCorsEnabled(false);
            return;
          }
          setStatus('error');
        }}
      />

      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: ACCENT_COLOR }}
      />

      {/* Clean Single-Row Header: Artwork + Track Metadata + EQ + Sync Stepper + Translation */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/[0.07] border border-white/10 flex items-center justify-center shrink-0">
            {artworkUrl && !artworkFailed ? (
              <img
                src={artworkUrl}
                alt="LANY ILYSB cover"
                referrerPolicy="no-referrer"
                onError={() => setArtworkFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music2 className="w-4 h-4 text-[#FF6B8A]" />
            )}
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white truncate">
              <span className="truncate">ILYSB</span>
              <span aria-hidden="true" className="text-zinc-500">·</span>
              <span className="text-zinc-300 font-medium truncate">LANY</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 truncate">
              <span>{lyricsOrigin === 'lrclib' ? 'LRCLIB Live' : 'LRCLIB Synced'}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">Chorus 2 (4 Lines)</span>
            </div>
          </div>
        </div>

        {/* Right Controls: Equalizer + Sync Offset Stepper + Translation */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <EqualizerBars
            color={ACCENT_COLOR}
            active={isPlaying && effectiveVolume > 0}
          />

          <div
            role="group"
            aria-label="Adjust lyric sync offset"
            className="inline-flex items-center rounded-lg bg-white/[0.05] border border-white/10 p-0.5 shrink-0"
          >
            <button
              type="button"
              onClick={() => handleAdjustSync(-SYNC_STEP)}
              disabled={syncOffsetSec <= MIN_SYNC_OFFSET}
              title="Delay lyrics 0.25s"
              aria-label="Delay lyrics by 0.25 seconds"
              className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => {
                vocalOnsetsRef.current = {};
                setSyncOffsetSec(DEFAULT_SYNC_OFFSET);
              }}
              title={`Reset offset to default (${formatOffset(DEFAULT_SYNC_OFFSET)})`}
              className="px-1.5 h-6 text-[11px] font-mono tabular-nums text-zinc-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Sync {formatOffset(syncOffsetSec)}
            </button>
            <button
              type="button"
              onClick={() => handleAdjustSync(SYNC_STEP)}
              disabled={syncOffsetSec >= MAX_SYNC_OFFSET}
              title="Advance lyrics 0.25s"
              aria-label="Advance lyrics by 0.25 seconds"
              className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowTranslation((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              showTranslation
                ? 'bg-[#FF2D55]/20 border-[#FF2D55]/45 text-white'
                : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-zinc-300'
            }`}
          >
            <Languages className="w-3.5 h-3.5 text-[#FF6B8A] shrink-0" />
            <span>{showTranslation ? 'Translated' : 'Original'}</span>
          </button>
        </div>
      </div>

      {/* Focus Lyric Viewport with Soft-White Continuous Glow Sweep */}
      {status === 'error' ? (
        <div className="relative z-10 h-[216px] flex flex-col items-center justify-center text-center px-4 space-y-3">
          <AlertCircle className="w-6 h-6 text-[#FF6B8A]" />
          <div className="space-y-1 max-w-xs">
            <p className="text-sm font-semibold text-white">
              Failed to load iTunes preview stream
            </p>
            <p className="text-xs text-zinc-400">
              Check your network connection and try reloading the audio preview.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadSources()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF2D55] hover:bg-[#FF476C] text-xs font-semibold text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reload</span>
          </button>
        </div>
      ) : (
        <div
          ref={viewportRef}
          className="relative z-10 h-[224px] sm:h-[236px] overflow-y-auto px-1 py-12 space-y-1.5 scroll-smooth"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
            scrollbarWidth: 'none',
          }}
        >
          {visibleLines.map((line, idx) => {
            const distance = Math.abs(idx - activeLineIndex);
            const isCurrent = distance === 0;

            const latchedOnset = vocalOnsetsRef.current[idx];
            const isWaitingForVocal =
              isCurrent &&
              isPlaying &&
              songLyricTime >= line.startSec &&
              latchedOnset === undefined;

            let lineProgress = 0;
            if (isCurrent) {
              if (songLyricTime < line.startSec || isWaitingForVocal) {
                lineProgress = 0;
              } else {
                const effectiveStart = latchedOnset ?? line.startSec + line.vocalDelaySec;
                const vocalDuration = Math.max(0.25, line.vocalEndSec - effectiveStart);
                lineProgress = Math.max(
                  0,
                  Math.min(1, (songLyricTime - effectiveStart) / vocalDuration)
                );
              }
            } else {
              lineProgress = idx < activeLineIndex || isEnded ? 1 : 0;
            }

            const blurPx =
              prefersReducedMotion || isCurrent
                ? 0
                : distance === 1
                  ? 1.4
                  : 3.0;

            const baseOpacity = isCurrent ? 1 : distance === 1 ? 0.56 : 0.28;
            const baseScale = prefersReducedMotion
              ? 1
              : isCurrent
                ? 1
                : distance === 1
                  ? 0.97
                  : 0.94;

            const wordSlots = buildDynamicWordSlots(line.text);

            return (
              <button
                key={`${line.startSec}-${idx}`}
                ref={(el) => {
                  lineRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => void handleSeekToLine(idx)}
                style={{
                  filter: `blur(${blurPx}px)`,
                  opacity: baseOpacity,
                  transform: `scale(${baseScale})`,
                  transition:
                    'filter 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`group w-full text-left px-3 py-2.5 rounded-xl origin-left focus-visible:outline-none hover:!blur-none hover:!opacity-95 transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                  isCurrent ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <p
                    className={`text-sm sm:text-base leading-snug tracking-tight ${
                      isCurrent ? 'font-bold text-white' : 'font-medium text-zinc-200'
                    }`}
                  >
                    {isCurrent ? (
                      wordSlots.map((slot, wIdx) => {
                        const span = Math.max(0.01, slot.end - slot.start);
                        const wordProgress = Math.max(
                          0,
                          Math.min(1, (lineProgress - slot.start) / span)
                        );
                        const fillEnd = wordProgress * 118;
                        const fadeStart = Math.max(0, fillEnd - 18);
                        const isSweeping = wordProgress > 0 && wordProgress < 1;
                        const isLit = wordProgress >= 1;

                        // Audio-reactive soft-white glow intensity (zero pink tint)
                        const glowRadius = isSweeping && isPlaying
                          ? (9 + reactivePulse * 7 + slot.emphasis * 2).toFixed(1)
                          : isLit || isSweeping
                            ? (5 + reactivePulse * 3).toFixed(1)
                            : '0';
                        const glowAlpha = isSweeping && isPlaying
                          ? (0.58 + reactivePulse * 0.3).toFixed(2)
                          : isLit || isSweeping
                            ? (0.28 + reactivePulse * 0.16).toFixed(2)
                            : '0';

                        const glowFilter =
                          isLit || isSweeping
                            ? `drop-shadow(0 0 ${glowRadius}px rgba(255, 255, 255, ${glowAlpha}))`
                            : 'none';

                        const liftPx =
                          !prefersReducedMotion && isSweeping && isPlaying
                            ? -(0.8 + reactivePulse * 1.1)
                            : 0;
                        const wordScale =
                          !prefersReducedMotion && isSweeping && isPlaying
                            ? 1.02 + reactivePulse * 0.028
                            : 1;

                        return (
                          <span
                            key={wIdx}
                            className="inline-block mr-[0.26em] last:mr-0"
                            style={{
                              backgroundImage: `linear-gradient(90deg, #FFFFFF 0%, #FFFFFF ${fadeStart}%, rgba(255, 255, 255, 0.34) ${Math.min(100, fillEnd)}%, rgba(255, 255, 255, 0.34) 100%)`,
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              color: 'transparent',
                              filter: glowFilter,
                              transform: `translateY(${liftPx.toFixed(2)}px) scale(${wordScale.toFixed(3)})`,
                              transition: 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                          >
                            {slot.word}
                          </span>
                        );
                      })
                    ) : (
                      <span>{line.text}</span>
                    )}
                  </p>

                  {showTranslation && line.translation && (
                    <p
                      className={`text-xs leading-snug text-zinc-300 transition-opacity ${
                        isCurrent ? 'opacity-90' : 'opacity-65'
                      }`}
                    >
                      {line.translation}
                    </p>
                  )}
                </div>

                <span className="text-[11px] font-mono tabular-nums text-zinc-500 pt-0.5 shrink-0">
                  {formatClock(line.startSec)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom Playbar: Play/Replay + Timeline Scrubber + Inline Volume Slider */}
      <div className="relative z-10 border-t border-white/[0.08] pt-3 flex flex-wrap sm:flex-nowrap items-center gap-3">
        <button
          type="button"
          onClick={() => void handleTogglePlay()}
          disabled={status === 'loading' || !itunesUrl}
          aria-label={
            isEnded
              ? 'Replay Chorus 2'
              : isPlaying
                ? 'Pause track'
                : 'Play ILYSB Chorus 2'
          }
          className={`h-10 rounded-full flex items-center justify-center gap-1.5 text-white font-semibold text-xs transition-all active:scale-95 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${
            isEnded ? 'px-3.5' : 'w-10'
          }`}
          style={{
            backgroundColor: ACCENT_COLOR,
            boxShadow: '0 4px 18px -2px rgba(255, 45, 85, 0.5)',
          }}
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isEnded ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">Replay</span>
            </>
          ) : isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Chorus Timeline Scrubber */}
        <div className="flex-1 min-w-[140px] space-y-1">
          <div className="relative flex items-center h-4">
            <input
              type="range"
              min={0}
              max={clipDurationSec}
              step={0.05}
              value={elapsed}
              disabled={status === 'loading' || !itunesUrl}
              onChange={(e) => handleScrub(parseFloat(e.target.value))}
              aria-label="Seek chorus timeline"
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/15 focus-visible:outline-none disabled:opacity-50"
              style={{
                background: `linear-gradient(to right, ${ACCENT_COLOR} ${progressPct}%, rgba(255,255,255,0.14) ${progressPct}%)`,
                accentColor: ACCENT_COLOR,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-zinc-400">
            <span>{formatClock(elapsed)}</span>
            <span className="text-zinc-500 text-[10px] font-sans hidden sm:inline">
              {isEnded ? 'Chorus 2 (4 lines) finished' : 'Tap any lyric line to jump'}
            </span>
            <span>{formatClock(clipDurationSec)}</span>
          </div>
        </div>

        {/* Inline Volume Icon + Slider in Playbar */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleToggleMute}
            aria-label={effectiveVolume === 0 ? 'Unmute audio' : 'Mute audio'}
            title={effectiveVolume === 0 ? 'Unmute audio' : 'Mute audio'}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-colors shrink-0"
          >
            {effectiveVolume === 0 ? (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            ) : effectiveVolume < 50 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={effectiveVolume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            aria-label="Audio volume"
            title={`Volume ${effectiveVolume}%`}
            className="w-16 sm:w-20 h-1.5 rounded-full appearance-none cursor-pointer bg-white/15 focus-visible:outline-none"
            style={{
              background: `linear-gradient(to right, ${ACCENT_COLOR} ${effectiveVolume}%, rgba(255,255,255,0.16) ${effectiveVolume}%)`,
              accentColor: ACCENT_COLOR,
            }}
          />
        </div>
      </div>
    </div>
  );
};
