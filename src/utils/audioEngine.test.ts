import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateLatencyMs,
  formatSampleRate,
  calculatePcmBitrateKbps,
  calculateEqualPowerGains,
  evaluateModuleHealth,
  getAudioTierLabel,
  calculatePeakFrequency,
  frequencyToBandName,
  byteToDecibels,
} from './audioEngine.ts';

test('calculateLatencyMs computes correct buffer delay', () => {
  // 64 samples at 192,000 Hz = (64 / 192000) * 1000 = 0.3333... ms
  assert.equal(calculateLatencyMs(64, 192000), 0.33);
  // 512 samples at 44,100 Hz = 11.61 ms
  assert.equal(calculateLatencyMs(512, 44100), 11.61);
  // zero sample rate
  assert.equal(calculateLatencyMs(64, 0), 0);
});

test('formatSampleRate formats sample rates into kHz', () => {
  assert.equal(formatSampleRate(192000), '192.0 kHz');
  assert.equal(formatSampleRate(96000), '96.0 kHz');
  assert.equal(formatSampleRate(44100), '44.1 kHz');
  assert.equal(formatSampleRate(0), '0 kHz');
});

test('calculatePcmBitrateKbps computes 24-bit 192kHz bitrate', () => {
  // 192000 * 24 * 2 / 1000 = 9216 kbps
  assert.equal(calculatePcmBitrateKbps(192000, 24, 2), 9216);
  // 44100 * 16 * 2 / 1000 = 1411.2 -> 1411 kbps
  assert.equal(calculatePcmBitrateKbps(44100, 16, 2), 1411);
});

test('calculateEqualPowerGains provides constant acoustic energy curve', () => {
  const atStart = calculateEqualPowerGains(0);
  assert.equal(atStart.gainA, 1);
  assert.equal(atStart.gainB, 0);

  const atEnd = calculateEqualPowerGains(1);
  assert.equal(atEnd.gainA, 0);
  assert.equal(atEnd.gainB, 1);

  const atMid = calculateEqualPowerGains(0.5);
  // At midpoint (45 deg), cos(pi/4) = sin(pi/4) = 0.707
  assert.equal(atMid.gainA, 0.707);
  assert.equal(atMid.gainB, 0.707);
  // gainA^2 + gainB^2 ~ 1.0 (constant acoustic power)
  const power = Math.pow(atMid.gainA, 2) + Math.pow(atMid.gainB, 2);
  assert.ok(Math.abs(power - 1.0) < 0.01);
});

test('evaluateModuleHealth grades latency thresholds', () => {
  assert.equal(evaluateModuleHealth(28), 'healthy');
  assert.equal(evaluateModuleHealth(180), 'healthy');
  assert.equal(evaluateModuleHealth(280), 'degraded');
  assert.equal(evaluateModuleHealth(1200), 'offline');
});

test('getAudioTierLabel determines audiophile tier', () => {
  assert.equal(getAudioTierLabel(24, 192000), 'Hi-Res Lossless');
  assert.equal(getAudioTierLabel(16, 44100), 'Lossless CD Quality');
  assert.equal(getAudioTierLabel(16, 32000), 'High Quality AAC');
});

test('calculatePeakFrequency detects peak Hz correctly', () => {
  // 128 bins with fftSize = 256, sampleRate = 48000 Hz. Bin resolution = 48000 / 256 = 187.5 Hz
  const data = new Uint8Array(128);
  data[10] = 250; // peak at bin index 10: 10 * 187.5 = 1875 Hz
  assert.equal(calculatePeakFrequency(data, 48000, 256), 1875);

  // All zeros
  assert.equal(calculatePeakFrequency(new Uint8Array(128), 48000, 256), 0);
});

test('frequencyToBandName classifies audio ranges', () => {
  assert.equal(frequencyToBandName(45), 'Sub-Bass');
  assert.equal(frequencyToBandName(120), 'Bass');
  assert.equal(frequencyToBandName(400), 'Low-Mid');
  assert.equal(frequencyToBandName(1000), 'Midrange');
  assert.equal(frequencyToBandName(3500), 'Presence');
  assert.equal(frequencyToBandName(12000), 'Brilliance');
  assert.equal(frequencyToBandName(0), 'Silence');
});

test('byteToDecibels converts 0-255 to dBFS range', () => {
  assert.equal(byteToDecibels(0, -100, -30), -100.0);
  assert.equal(byteToDecibels(255, -100, -30), -30.0);
  assert.equal(byteToDecibels(127.5, -100, -30), -65.0);
});

