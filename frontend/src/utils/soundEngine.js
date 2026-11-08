// Web Audio API synthesizer for festive Diwali audio effects
// No external MP3 downloads required; fully offline & cross-platform!

class SoundEngine {
  constructor() {
    this.ctx = null
    this.ambientGain = null
    this.ambientOsc1 = null
    this.ambientOsc2 = null
    this.isMuted = true
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Play a crackling firework burst sound
  playFirework() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime

    // White noise burst for the explosion
    const bufferSize = this.ctx.sampleRate * 0.4
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    // Filter to make it sound like a firework explosion
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.35)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(0.7, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)

    noise.start(now)

    // Add high crackle sparkle
    setTimeout(() => {
      if (this.isMuted || !this.ctx) return
      this.playSparkle()
    }, 120)
  }

  // Chime / Temple bell tone for lighting a Diya
  playDiyaChime() {
    if (this.isMuted) return
    this.init()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    // 528Hz or 880Hz sacred harmonic
    const baseFreq = 528 + Math.random() * 80
    osc.frequency.setValueAtTime(baseFreq, now)
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.4)

    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.8)
  }

  // Little sparkle sound
  playSparkle() {
    if (this.isMuted || !this.ctx) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1200 + Math.random() * 600, now)
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(now)
    osc.stop(now + 0.2)
  }

  // Gentle ambient tanpura / meditative festive drone
  startAmbient() {
    this.init()
    if (!this.ctx) return
    this.isMuted = false

    if (this.ambientOsc1) return // already playing

    const now = this.ctx.currentTime
    this.ambientGain = this.ctx.createGain()
    this.ambientGain.gain.setValueAtTime(0.01, now)
    this.ambientGain.gain.linearRampToValueAtTime(0.06, now + 2)

    // Fundamental Sa (C# / ~138 Hz) and Pa (G# / ~207 Hz)
    this.ambientOsc1 = this.ctx.createOscillator()
    this.ambientOsc1.type = 'sine'
    this.ambientOsc1.frequency.setValueAtTime(138.59, now)

    this.ambientOsc2 = this.ctx.createOscillator()
    this.ambientOsc2.type = 'triangle'
    this.ambientOsc2.frequency.setValueAtTime(207.65, now)

    this.ambientOsc1.connect(this.ambientGain)
    this.ambientOsc2.connect(this.ambientGain)
    this.ambientGain.connect(this.ctx.destination)

    this.ambientOsc1.start()
    this.ambientOsc2.start()
  }

  stopAmbient() {
    this.isMuted = true
    if (!this.ctx || !this.ambientGain) return

    const now = this.ctx.currentTime
    this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.5)

    setTimeout(() => {
      if (this.ambientOsc1) {
        try { this.ambientOsc1.stop() } catch {}
        this.ambientOsc1.disconnect()
        this.ambientOsc1 = null
      }
      if (this.ambientOsc2) {
        try { this.ambientOsc2.stop() } catch {}
        this.ambientOsc2.disconnect()
        this.ambientOsc2 = null
      }
    }, 600)
  }

  toggle(on) {
    if (on) {
      this.startAmbient()
    } else {
      this.stopAmbient()
    }
  }
}

export const soundEngine = new SoundEngine()
