import * as Tone from "tone";
import { Env } from "./envelope.js";

class FMSynth {
    constructor() {
        this._c1ratio = 1.0;
        this._c2ratio = 1.0;
        this._c3ratio = 1.0;
        this._fm3to2 = 0.0;
        this._fm3to1 = 0.0;
        this._fm2to1 = 0.0;

        this.out = new Tone.Gain(0.83);
        this.opLim = new Tone.Limiter(-1.0).connect(this.out);
        
        this.op1gain = new Tone.Gain(1.0).connect(this.opLim);
        this.op2gain = new Tone.Gain(1.0).connect(this.opLim);
        this.op3gain = new Tone.Gain(1.0).connect(this.opLim);
        
        // OP 3
        this.fm3to2 = new Tone.Multiply(0.0);
        this.fm3to1 = new Tone.Multiply(0.0);
        this.fm2to1 = new Tone.Multiply(0.0);
        
        this.c3env = new Env(0.0, 1.0);
        this.c3env.out.fan(
            this.op3gain,
            this.fm3to2,
            this.fm3to1
        );
        this.c3 = new Tone.Oscillator(this.freq, "sine").connect(this.c3env.out).start()
        this.c3freq = new Tone.Multiply().connect(this.c3.frequency);
        this.c3ratio = new Tone.Signal(this._c3ratio).connect(this.c3freq);
            
        // OP 2
        this.c2env = new Env(0.0, 1.0);
        this.c2env.out.fan(this.op2gain, this.fm2to1);
        this.c2 = new Tone.Oscillator(this.freq, "sine").connect(this.c2env.out).start();
        this.c2fb1 = new Tone.Add(0.0).connect(this.c2.frequency);
        this.c2freq = new Tone.Multiply(1.0).connect(this.c2fb1);
        this.c2ratio = new Tone.Signal(this._c2ratio).connect(this.c2freq);
            
        // OP 1
        this.c1env = new Env(0.0, 1.0);
        this.c1env.out.connect(this.op1gain);
        this.c1 = new Tone.Oscillator(this.freq, "sine").start()
        .connect(this.c1env.out);
        this.c1fb2 = new Tone.Add(0.0).connect(this.c1.frequency);
        this.c1fb1 = new Tone.Add(0.0).connect(this.c1fb2);
        this.c1freq = new Tone.Multiply(1.0).connect(this.c1fb1);
        this.c1ratio = new Tone.Signal(1.0).connect(this.c1freq);
            
        this.fund = new Tone.Signal(250).fan(
            this.c1freq.factor,
            this.c2freq.factor,
            this.c3freq.factor
        );
                
        // Now hook up the feedbacks
        this.fm2to1.fan(this.c1fb2.addend);
        this.fm3to1.fan(this.c1fb1.addend);
        this.fm3to2.fan(this.c2fb1.addend);

        this.busy = false;
        this.voiceManager = new Tone.Synth();
        this.voiceManager.onsilence = () => {
            this.busy = false;
        }
    }

    trigger(time, dummy, parameters) {
        this.busy = true;
        const maxTime = Math.max(
            parameters[7], 
            parameters[8], 
            parameters[9]
        );
        
        this.voiceManager.triggerAttackRelease("C4", maxTime / 10, time);
        this.fund.value = parameters[0];
        this.c1ratio.value = parameters[1];
        this.c2ratio.value = parameters[2];
        this.c3ratio.value = parameters[3];
        this.fm2to1.factor.value = parameters[4];
        this.fm3to1.factor.value = parameters[5];
        this.fm3to2.factor.value = parameters[6];
        this.c1env.release = parameters[7];
        this.c2env.release = parameters[8];
        this.c3env.release = parameters[9];
        this.op1gain.gain.value = parameters[10];
        this.op2gain.gain.value = parameters[11];
        this.op3gain.gain.value = parameters[12];
        this.c1env.trigger(time, parameters[13]);
        this.c2env.trigger(time, parameters[13]);
        this.c3env.trigger(time, parameters[13]);
    }
}
    
export { FMSynth };
        