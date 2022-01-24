import { Tala } from './tala.js';
import * as assert from 'assert';
import chai from 'chai';


describe('construction', () => {
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

describe('patterns', () => {
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
})