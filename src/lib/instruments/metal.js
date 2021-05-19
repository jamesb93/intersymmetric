import * as Tone from "tone";

class MetalSynth {
    constructor() {
        this.out = new Tone.Gain(0.3);
        this.limiter = new Tone.Limiter(-1.0).connect(this.out);
        this.comp = new Tone.Compressor(-12, 3).connect(this.limiter);
        this.source = new Tone.MetalSynth().connect(this.comp);
    }

    trigger(time, velocity, duration) {
        this.source.triggerAttackRelease(this.source.frequency.value, duration, time, velocity)
    }
}

export { MetalSynth };