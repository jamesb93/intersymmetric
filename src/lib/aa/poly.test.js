import { Poly } from './poly.js';
import * as assert from 'assert';

class Dummy {
    constructor() {
        this.busy = false;
        this.out = {};
        this.out.toDestination = () => {};
    };

    makeBusy() { this.busy = true };
    makeFree() { this.busy = false};
    toDestination() { return };
    trigger(time, duration, parameters) { return };
}

describe('poly wrapper tests', () => {
    it('should construct with a synth and voice', () => {
        const p = new Poly(Dummy, 10);
        const instance = p instanceof Poly;
        assert.equal(instance, true);
    })

    it ('should have 3 internal synths', () => {
        const p = new Poly(Dummy, 3);
        assert.equal(p.voices.length, 3);
    })

    it('should construct with an empty queue', () => {
        const p = new Poly(Dummy, 1);
        assert.equal(p.queue.elements.length, 0);
    })

    it ('should have 4 elements in the queue', () => {
        const p = new Poly(Dummy, 4);
        for (let i=0; i<4; i++) {
            p.trigger(0, 0, 0)
        }
        assert.equal(p.queue.elements.length, 4);
    })
})
