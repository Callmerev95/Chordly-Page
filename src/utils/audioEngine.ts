/**
 * Audio Engine calculations, telemetry formatters, and crossfade curves for Chordly.
 */

export interface CodecStats {
  format: 'FLAC' | 'ALAC' | 'WAV' | 'DSD' | 'AAC';
  bitDepth: number; // e.g. 24
  sampleRate: number; // e.g. 192000
  channels: number; // e.g. 2
  bufferSize: number; // e.g. 64
  dacModel: string;
  isExclusiveMode: boolean;
}

/**
 * Calculates theoretical one-way buffer latency in milliseconds.
 * Latency (ms) = (bufferSize / sampleRate) * 1000
 */
export function calculateLatencyMs(bufferSize: number, sampleRate: number): number {
  if (sampleRate <= 0 || bufferSize <= 0) return 0;
  const latency = (bufferSize / sampleRate) * 1000;
  return Number(latency.toFixed(2));
}

/**
 * Formats sample rate in kHz (e.g. 192000 -> "192.0 kHz", 44100 -> "44.1 kHz")
 */
export function formatSampleRate(sampleRate: number): string {
  if (sampleRate <= 0) return '0 kHz';
  const khz = sampleRate / 1000;
  return `${khz.toFixed(1)} kHz`;
}

/**
 * Calculates uncompressed bitrate in kbps for PCM audio.
 * Bitrate = (sampleRate * bitDepth * channels) / 1000
 */
export function calculatePcmBitrateKbps(sampleRate: number, bitDepth: number, channels: number = 2): number {
  if (sampleRate <= 0 || bitDepth <= 0 || channels <= 0) return 0;
  return Math.round((sampleRate * bitDepth * channels) / 1000);
}

/**
 * Equal-power crossfade curve calculation between Track A and Track B.
 * At position t (0.0 to 1.0):
 * Gain A = cos(t * pi / 2)
 * Gain B = sin(t * pi / 2)
 * Preserves perceived loudness across the transition without volume dip.
 */
export function calculateEqualPowerGains(progress: number): { gainA: number; gainB: number } {
  const clamped = Math.max(0, Math.min(1, progress));
  const angle = clamped * (Math.PI / 2);
  const gainA = Number(Math.cos(angle).toFixed(3));
  const gainB = Number(Math.sin(angle).toFixed(3));
  return { gainA, gainB };
}

/**
 * Validates audio source endpoint configuration for pluggable modules.
 */
export interface SourceModule {
  id: string;
  name: string;
  type: 'core' | 'community' | 'local';
  endpoint: string;
  pingMs: number;
  status: 'healthy' | 'degraded' | 'offline';
  bitPerfectSupported: boolean;
}

export function evaluateModuleHealth(pingMs: number): 'healthy' | 'degraded' | 'offline' {
  if (pingMs <= 0 || pingMs > 1000) return 'offline';
  if (pingMs > 250) return 'degraded';
  return 'healthy';
}

/**
 * Generates human-readable audio tier badges
 */
export function getAudioTierLabel(bitDepth: number, sampleRate: number): string {
  if (bitDepth >= 24 && sampleRate >= 96000) {
    return 'Hi-Res Lossless';
  }
  if (bitDepth >= 16 && sampleRate >= 44100) {
    return 'Lossless CD Quality';
  }
  return 'High Quality AAC';
}

/**
 * Calculates peak dominant frequency in Hz from Web Audio AnalyserNode frequency data.
 */
export function calculatePeakFrequency(
  frequencyData: Uint8Array | number[],
  sampleRate: number,
  fftSize: number
): number {
  if (!frequencyData || frequencyData.length === 0 || sampleRate <= 0 || fftSize <= 0) {
    return 0;
  }
  let maxVal = -1;
  let maxIdx = 0;
  for (let i = 0; i < frequencyData.length; i++) {
    if (frequencyData[i] > maxVal) {
      maxVal = frequencyData[i];
      maxIdx = i;
    }
  }
  if (maxVal <= 0) return 0;
  const binResolution = sampleRate / fftSize;
  return Math.round(maxIdx * binResolution);
}

/**
 * Maps audio frequency in Hz to acoustic band classification.
 */
export function frequencyToBandName(freqHz: number): string {
  if (freqHz <= 0) return 'Silence';
  if (freqHz < 60) return 'Sub-Bass';
  if (freqHz < 250) return 'Bass';
  if (freqHz < 500) return 'Low-Mid';
  if (freqHz < 2000) return 'Midrange';
  if (freqHz < 6000) return 'Presence';
  return 'Brilliance';
}

/**
 * Converts 0-255 byte frequency value to decibels relative to full scale (dBFS).
 */
export function byteToDecibels(
  byteValue: number,
  minDecibels: number = -100,
  maxDecibels: number = -30
): number {
  const normalized = Math.max(0, Math.min(255, byteValue)) / 255;
  const db = minDecibels + normalized * (maxDecibels - minDecibels);
  return Number(db.toFixed(1));
}

