export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function formatTime(totalSec: number): string {
  const s = Math.max(0, totalSec);
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export type UiSoundType =
  | 'click'
  | 'select'
  | 'flag'
  | 'next'
  | 'prev'
  | 'unlock'
  | 'error'
  | 'complete'
  | 'celebrate';

const SOUND_STORAGE_KEY = 'saat_sound_enabled';
let sharedAudioCtx: AudioContext | null = null;
let cachedNoiseBuffer: AudioBuffer | null = null;
let soundEnabledState: boolean = (() => {
  try {
    const saved = window.localStorage.getItem(SOUND_STORAGE_KEY);
    return saved !== 'false';
  } catch {
    return true;
  }
})();

export function getSoundEnabled(): boolean {
  return soundEnabledState;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabledState = enabled;
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
  } catch {
    // Ignore storage restrictions
  }
}

function getAudioContext(): AudioContext | null {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx();
      cachedNoiseBuffer = null;
    }
    if (sharedAudioCtx.state === 'suspended') {
      void sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (cachedNoiseBuffer && cachedNoiseBuffer.sampleRate === ctx.sampleRate) {
    return cachedNoiseBuffer;
  }
  const length = Math.floor(ctx.sampleRate * 0.2);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    // Sharp percussive white noise shaped slightly toward the front
    data[i] = (Math.random() * 2 - 1) * Math.exp((-i / length) * 2.5);
  }
  cachedNoiseBuffer = buffer;
  return buffer;
}

function scheduleTone(
  ctx: AudioContext,
  freqStart: number,
  freqEnd: number,
  startOffset: number,
  duration: number,
  type: OscillatorType = 'sine',
  peakGain = 0.05,
): void {
  const startTime = ctx.currentTime + startOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freqStart, startTime);
  if (freqEnd !== freqStart) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), startTime + duration);
  }
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + Math.min(0.015, duration * 0.2));
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

function scheduleSingleClap(
  ctx: AudioContext,
  noiseBuffer: AudioBuffer,
  offsetSec: number,
  centerFreq: number,
  volume: number,
  pan = 0,
): void {
  const startTime = ctx.currentTime + offsetSec;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(centerFreq, startTime);
  filter.Q.setValueAtTime(1.7, startTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.095);

  src.connect(filter);
  filter.connect(gain);

  if (typeof ctx.createStereoPanner === 'function') {
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), startTime);
    gain.connect(panner);
    panner.connect(ctx.destination);
  } else {
    gain.connect(ctx.destination);
  }

  src.start(startTime);
  src.stop(startTime + 0.11);
}

function scheduleFireworkPop(ctx: AudioContext, noiseBuffer: AudioBuffer, offsetSec: number, pan = 0): void {
  const startTime = ctx.currentTime + offsetSec;
  // Subtle launch whoosh rising pitch right before burst
  scheduleTone(ctx, 260, 880, Math.max(0, offsetSec - 0.16), 0.15, 'sine', 0.025);

  // Low boom thump
  scheduleTone(ctx, 130, 42, offsetSec, 0.24, 'triangle', 0.09);

  // Filtered noise burst + crackle
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(950, startTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(0.11, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);

  src.connect(filter);
  filter.connect(gain);
  if (typeof ctx.createStereoPanner === 'function') {
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(pan, startTime);
    gain.connect(panner);
    panner.connect(ctx.destination);
  } else {
    gain.connect(ctx.destination);
  }
  src.start(startTime);
  src.stop(startTime + 0.19);
}

function playCelebrationAudio(ctx: AudioContext): void {
  const noiseBuffer = getNoiseBuffer(ctx);

  // 1. Triumphant celebratory chord & arpeggio fanfare
  const fanfareNotes = [
    { f: 523.25, t: 0.0, d: 0.16 }, // C5
    { f: 659.25, t: 0.08, d: 0.16 }, // E5
    { f: 783.99, t: 0.16, d: 0.18 }, // G5
    { f: 1046.5, t: 0.25, d: 0.45 }, // C6
    { f: 987.77, t: 0.48, d: 0.14 }, // B5
    { f: 1046.5, t: 0.62, d: 0.65 }, // C6 hold
    { f: 1318.5, t: 0.65, d: 0.6 }, // E6 harmony
  ];
  for (const n of fanfareNotes) {
    scheduleTone(ctx, n.f, n.f, n.t, n.d, 'triangle', 0.06);
  }

  // 2. Realistic multi-person clapping / applause chorus (34 staggered claps over ~2.7s)
  for (let i = 0; i < 34; i++) {
    const progress = i / 34;
    // Slight swell in intensity then gentle fade out
    const env = progress < 0.2 ? 0.55 + progress * 2.2 : 1 - (progress - 0.2) * 0.72;
    const jitter = (Math.random() - 0.5) * 0.055;
    const offset = Math.max(0.05, 0.08 + i * 0.075 + jitter);
    const centerFreq = 1050 + Math.random() * 1450;
    const volume = (0.065 + Math.random() * 0.055) * Math.max(0.2, env);
    const pan = (Math.random() * 2 - 1) * 0.75;
    scheduleSingleClap(ctx, noiseBuffer, offset, centerFreq, volume, pan);
  }

  // 3. Firework bursts & pops spaced across the celebration
  scheduleFireworkPop(ctx, noiseBuffer, 0.25, -0.45);
  scheduleFireworkPop(ctx, noiseBuffer, 0.85, 0.5);
  scheduleFireworkPop(ctx, noiseBuffer, 1.5, -0.2);
  scheduleFireworkPop(ctx, noiseBuffer, 2.15, 0.35);
}

export function playUiTone(type: UiSoundType): void {
  if (!soundEnabledState) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    switch (type) {
      case 'click':
        scheduleTone(ctx, 540, 620, 0, 0.045, 'sine', 0.032);
        break;
      case 'select':
        scheduleTone(ctx, 520, 720, 0, 0.07, 'sine', 0.05);
        scheduleTone(ctx, 780, 880, 0.035, 0.06, 'sine', 0.03);
        break;
      case 'flag':
        scheduleTone(ctx, 440, 440, 0, 0.06, 'triangle', 0.045);
        scheduleTone(ctx, 660, 660, 0.055, 0.08, 'triangle', 0.045);
        break;
      case 'next':
        scheduleTone(ctx, 480, 640, 0, 0.06, 'sine', 0.038);
        break;
      case 'prev':
        scheduleTone(ctx, 600, 440, 0, 0.06, 'sine', 0.038);
        break;
      case 'unlock':
        scheduleTone(ctx, 523.25, 523.25, 0, 0.09, 'triangle', 0.055);
        scheduleTone(ctx, 659.25, 659.25, 0.07, 0.09, 'triangle', 0.055);
        scheduleTone(ctx, 783.99, 1046.5, 0.14, 0.18, 'triangle', 0.06);
        break;
      case 'error':
        scheduleTone(ctx, 240, 190, 0, 0.11, 'sawtooth', 0.035);
        scheduleTone(ctx, 190, 150, 0.1, 0.13, 'sawtooth', 0.032);
        break;
      case 'complete':
        scheduleTone(ctx, 523.25, 523.25, 0, 0.12, 'sine', 0.055);
        scheduleTone(ctx, 659.25, 659.25, 0.09, 0.12, 'sine', 0.055);
        scheduleTone(ctx, 783.99, 783.99, 0.18, 0.24, 'sine', 0.06);
        break;
      case 'celebrate':
        playCelebrationAudio(ctx);
        break;
    }
  } catch {
    // Ignore audio errors on restricted browsers
  }
}
