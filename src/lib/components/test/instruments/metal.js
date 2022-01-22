import * as Tone from "tone";

class MetalSynth {
    constructor() {
        this.out = new Tone.Gain(0.21);
        this.limiter = new Tone.Limiter(-1.0).connect(this.out);
        this.comp = new Tone.Compressor(-12, 3).connect(this.limiter);
        this.source = new Tone.MetalSynth().connect(this.comp);
    }

    trigger(time, duration, parameters) {
        this.source.frequency.value = parameters[0];
        this.source.harmonicity = parameters[1];
        this.source.modulationIndex = parameters[2];
        this.source.resonance = parameters[3];
        this.source.octaves = parameters[4];
        this.source.order = parameters[5];
        this.source.envelope.attack = parameters[6];
        this.source.envelope.decay = parameters[7];
        this.source.envelope.release = parameters[8];
        this.source.triggerAttackRelease(
            this.source.frequency.value, 
            duration, 
            time, 
            parameters[9]
        )
    }
}

export { MetalSynth };