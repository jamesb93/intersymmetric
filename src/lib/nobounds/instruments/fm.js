import * as Tone from 'tone';
import { Env } from './envelope.js';

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
		this.c3env.out.fan(this.op3gain, this.fm3to2, this.fm3to1);
		this.c3 = new Tone.Oscillator(this.freq, 'sine').start().connect(this.c3env.out);
		this.c3freq = new Tone.Multiply().connect(this.c3.frequency);
		this.c3ratio = new Tone.Signal(this._c3ratio).connect(this.c3freq);

		// OP 2
		this.c2env = new Env(0.0, 1.0);
		this.c2env.out.fan(this.op2gain, this.fm2to1);
		this.c2 = new Tone.Oscillator(this.freq, 'sine').start().connect(this.c2env.out);
		this.c2fb1 = new Tone.Add(0.0).connect(this.c2.frequency);
		this.c2freq = new Tone.Multiply(1.0).connect(this.c2fb1);
		this.c2ratio = new Tone.Signal(this._c2ratio).connect(this.c2freq);

		// OP 1
		this.c1env = new Env(0.0, 1.0);
		this.c1env.out.connect(this.op1gain);
		this.c1 = new Tone.Oscillator(this.freq, 'sine').start().connect(this.c1env.out);
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
	}
	trigger(time, velocity) {
		this.c1env.trigger(time, velocity);
		this.c2env.trigger(time, velocity);
		this.c3env.trigger(time, velocity);
	}
}

export { FMSynth };
