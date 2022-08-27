import * as Tone from 'tone';
import { clip } from '$lib/utility.js';
class SnareSynth {
    constructor() {
        this.out = new Tone.Limiter(-0.1);
        this.gain = new Tone.Gain(2.0).connect(this.out);
        this.env = new Tone.AmplitudeEnvelope().connect(this.gain);
        this.waveshaper = new Tone.Chebyshev(1).connect(this.env);
        this.membrane = new Tone.MembraneSynth({
            pitchDecay: 0,
            envelope: {
                attack: 0.005,
                decay: 0.08,
                sustain: 0.01,
                release: 0.01
            },
            frequency: 160
        }).connect(this.waveshaper);

        this.filter = new Tone.Filter(5000, 'bandpass', -12).connect(this.waveshaper);
        this.source = new Tone.Noise().connect(this.filter).start();
    }
    trigger(time, velocity, duration) {
        velocity = clip(velocity, 0.09, 1.0);
        this.env.triggerAttack(time, velocity);
        this.env.triggerRelease(time + 0.001);
        this.membrane.triggerAttackRelease(this.membrane.frequency.value, duration, time, velocity);
    }
}

export { SnareSynth };
