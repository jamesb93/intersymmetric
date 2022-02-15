import * as Tone from "tone";

class SnareSynth {
    constructor() {
        this.out = new Tone.Limiter(-0.1)
        this.gain = new Tone.Gain(2.0).connect(this.out);
        this.env = new Tone.AmplitudeEnvelope()
            .connect(this.gain);
        this.waveshaper = new Tone.Chebyshev(1)
            .connect(this.env);
        this.membrane = new Tone.MembraneSynth({
            'pitchDecay' : 0,
            'envelope' : {
            'attack' : 0.005,
            'decay' : 0.08,
                'sustain' : 0.01,
                'release' : 0.01
            },
            frequency: 160
        }).connect(this.waveshaper)
            
        this.filter = new Tone.Filter(5000, "bandpass", -12)
            .connect(this.waveshaper);
        this.source = new Tone.Noise()
            .connect(this.filter)
            .start();
        
        this.busy = false;
        this.membrane.onsilence = () => {
            this.busy = false;
        }
    }
    trigger(time, duration, parameters) {
        this.busy = true;
        this.filter.frequency.value = parameters[0];
        this.env.attack = parameters[1];
        this.env.decay = parameters[2];
        this.env.release = parameters[3];
        this.env.sustain = parameters[4];
        this.waveshaper.order = parameters[5];
        this.membrane.frequency.value = parameters[6];
        this.env.triggerAttack(time, parameters[7])
        this.env.triggerRelease(time+0.001)
        this.membrane.triggerAttackRelease(
            this.membrane.frequency.value, 
            duration,
            time, 
            parameters[7]
        )
    }
}

export { SnareSynth };