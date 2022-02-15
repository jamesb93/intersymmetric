import { Tala } from './tala.js';
import * as assert from 'assert';
import chai from 'chai';


describe('tala construction', () => {
    it('should have a pattern', () => {
        const t = new Tala([1, 2, 3])
        chai.assert.lengthOf(t.pattern, 3);
        chai.assert.deepEqual(t.pattern, [1, 2, 3]);
    })

    it('should have no pattern', () => {
        const t = new Tala();
        chai.assert.equal(t.pattern.length, 0);
    })
});

describe('tala iteration and modes', () => {
    it('deep pattern', () => {
        const t = new Tala([2, 4, 2, 3]);
        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [0, 1]);
        chai.assert.deepEqual(t.next(), [1, 0]);
        chai.assert.deepEqual(t.next(), [1, 1]);
        chai.assert.deepEqual(t.next(), [1, 2]);
        chai.assert.deepEqual(t.next(), [1, 3]);
        chai.assert.deepEqual(t.next(), [2, 0]);
        chai.assert.deepEqual(t.next(), [2, 1]);
        chai.assert.deepEqual(t.next(), [3, 0]);
        chai.assert.deepEqual(t.next(), [3, 1]);
        chai.assert.deepEqual(t.next(), [3, 2]);
        chai.assert.deepEqual(t.next(), [0, 0]);
    })

    it('nested pattern', () => {
        const t = new Tala([1, 2, 3]);
        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [1, 0]);
        chai.assert.deepEqual(t.next(), [1, 1]);
        chai.assert.deepEqual(t.next(), [2, 0]);
        chai.assert.deepEqual(t.next(), [2, 1]);
        chai.assert.deepEqual(t.next(), [2, 2]);
        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [1, 0]);
    })

    it ('non-nested pattern', () => {
        const t = new Tala([4]);
        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [0, 1]);
        chai.assert.deepEqual(t.next(), [0, 2]);
        chai.assert.deepEqual(t.next(), [0, 3]);
        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [0, 1]);
    })

    it('backward mode', () => {
        const t = new Tala([2, 3, 4]);
        t.mode = 1;
        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [0, 1]);

        chai.assert.deepEqual(t.next(), [2, 0]);
        chai.assert.deepEqual(t.next(), [2, 1]);
        chai.assert.deepEqual(t.next(), [2, 2]);
        chai.assert.deepEqual(t.next(), [2, 3]);

        chai.assert.deepEqual(t.next(), [1, 0]);
        chai.assert.deepEqual(t.next(), [1, 1]);
        chai.assert.deepEqual(t.next(), [1, 2]);

        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [0, 1]);
    })

    it ('rebound mode', () => {
        const t = new Tala([2, 3, 4]);
        t.mode = 2;
        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [0, 1]);

        chai.assert.deepEqual(t.next(), [1, 0]);
        chai.assert.deepEqual(t.next(), [1, 1]);
        chai.assert.deepEqual(t.next(), [1, 2]);

        chai.assert.deepEqual(t.next(), [2, 0]);
        chai.assert.deepEqual(t.next(), [2, 1]);
        chai.assert.deepEqual(t.next(), [2, 2]);
        chai.assert.deepEqual(t.next(), [2, 3]);

        chai.assert.deepEqual(t.next(), [1, 0]);
        chai.assert.deepEqual(t.next(), [1, 1]);
        chai.assert.deepEqual(t.next(), [1, 2]);

        chai.assert.deepEqual(t.next(), [0, 0]);
        chai.assert.deepEqual(t.next(), [0, 1]);

        chai.assert.deepEqual(t.next(), [1, 0]);
        chai.assert.deepEqual(t.next(), [1, 1]);
        chai.assert.deepEqual(t.next(), [1, 2]);
    })

    it ('random mode', () => {
        const pattern = [2, 3, 4, 5];
        let t = new Tala(pattern);
        t.mode = 3;

        let first_pass = [];
        for (let i=0; i < 1000; i++) {
            first_pass.push(t.next());
        }

        t = new Tala(pattern);
        t.mode = 3;
        let second_pass = [];
        for (let i=0; i < 1000; i++) {
            second_pass.push(t.next());
        }

        chai.assert.notDeepEqual(first_pass, second_pass);
    })
})