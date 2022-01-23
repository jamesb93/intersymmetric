import * as Tone from "tone";

class KickSynth {
    constructor() {
        this.out = new Tone.Limiter(-0.1);
        this.gain = new Tone.Gain(1.25).connect(this.out);
        this.distortion = new Tone.Distortion(0.0).connect(this.gain);
        this.membrane = new Tone.MembraneSynth().connect(this.distortion);
        this.distortion.oversample = "none";
        
        this.busy = false;
        this.membrane.onsilence = () => {
            this.busy = false
        }
    }
    trigger(time, duration, parameters) {
        this.busy = true;
        this.distortion.distortion = parameters[0];
        this.membrane.frequency.value = parameters[1];
        this.membrane.octaves = parameters[2];
        this.membrane.envelope.attack = parameters[3];
        this.membrane.envelope.decay = parameters[4];
        this.membrane.envelope.sustain = parameters[5];
        this.membrane.envelope.release = parameters[6];
        this.membrane.triggerAttackRelease(
            this.membrane.frequency.value, 
            duration, 
            time, 
            parameters[7]
        );
    }
}

export { KickSynth };