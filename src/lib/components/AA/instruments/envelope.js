import * as Tone from 'tone';

class Env {
    constructor(attack, release) {
        this.attack = attack;
        this.release = release;
        this.out = new Tone.Multiply(0.0);
        this.line = new Tone.Signal(0, { minValue: 0, maxValue: 1 }).connect(this.out.factor);
    }

    trigger(time, velocity) {
        this.line.exponentialRampTo(1.0 * velocity, this.attack, time);
        this.line.exponentialRampTo(0.0, this.release, time+this.attack);
    }
}

export { Env }
