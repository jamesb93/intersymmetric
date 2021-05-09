import * as Tone from "tone";

class KickSynth {
    constructor() {
        this.out = new Tone.Limiter(-1)
        this.distortion = new Tone.Distortion(0.0).connect(this.out);
        this.membrane = new Tone.MembraneSynth().connect(this.distortion);
        this.distortion.oversample = "2x";
    }
    trigger(time, velocity, duration) {
        this.membrane.triggerAttackRelease(this.membrane.frequency.value, duration, time, velocity)
    }
}

export { KickSynth };