import { Queue } from './queue.js'
import * as assert from 'assert';

describe('adding elements to queue', () => {
    const q = new Queue(4);
    for (let i=0; i<5; i++) {
        q.enqueue(Math.random())
    };
    it('should have five elements', () => {
        assert.equal(q.elements.length,4)
    })
});

describe('removing elements to queue', () => {
    const q = new Queue(4);
    for (let i=0; i<5; i++) {
        q.enqueue(Math.random());
    };

    for (let i=0; i<4; i++) {
        q.dequeue();
    }
    it('should be empty', () => {
        assert.equal(q.elements.length, 0);
    })
});

describe('insertion order', () => {
    const q = new Queue(4);
    for (let i=0; i<4; i++) {
        q.enqueue(i);
    };

    it('should have 0 as the first element', () => {
        assert.equal(q.peek(), 0);
    })
});
