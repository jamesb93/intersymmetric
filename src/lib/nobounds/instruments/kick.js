import * as Tone from 'tone';

class KickSynth {
    constructor() {
        this.out = new Tone.Limiter(-0.1);
        this.gain = new Tone.Gain(1.25).connect(this.out);
        this.distortion = new Tone.Distortion(0.0).connect(this.gain);
        this.membrane = new Tone.MembraneSynth().connect(this.distortion);

        this.distortion.oversample = 'none';
    }
    trigger(time, velocity, duration) {
        this.membrane.triggerAttackRelease(this.membrane.frequency.value, duration, time, velocity);
    }
}

export { KickSynth };
