import { Pattern } from './pattern.js';
import chai from 'chai';


describe('pattern construction', () => {
    it('constructs', () => {
        const t = new Pattern([1, 2, 3]);
        chai.assert.exists(t);
    })

    it('should have a pattern', () => {
        const t = new Pattern([4, 5, 6]);
        chai.assert.deepEqual(t.pattern, [4, 5, 6]);
        chai.assert.lengthOf(t.pattern, 3);
    })

    it('should have a mode of 1', () => {
        const t = new Pattern([1, 2]);
        t.mode = 1;
        chai.assert.equal(t.mode, 1);
    })
});

describe('patterns iteration in all modes', () => {
    it('forward', () => {
        const t = new Pattern([100, 200, 300]);
        t.mode = 0;
        chai.assert.equal(t.next(), 100);
        chai.assert.equal(t.next(), 200);
        chai.assert.equal(t.next(), 300);
        chai.assert.equal(t.next(), 100);
    })

    it('backward', () => {
        const t = new Pattern([100, 200, 300, 400]);
        t.mode = 1;
        chai.assert.equal(t.next(), 100);
        chai.assert.equal(t.next(), 400);
        chai.assert.equal(t.next(), 300);
        chai.assert.equal(t.next(), 200);
        chai.assert.equal(t.next(), 100);
    })

    it('rebound', () => {
        const t = new Pattern([100, 200, 300, 400]);
        t.mode = 2;
        chai.assert.equal(t.next(), 100);
        chai.assert.equal(t.next(), 200);
        chai.assert.equal(t.next(), 300);
        chai.assert.equal(t.next(), 400);
        chai.assert.equal(t.next(), 300);
        chai.assert.equal(t.next(), 200);
        chai.assert.equal(t.next(), 100);
        chai.assert.equal(t.next(), 200);
        chai.assert.equal(t.next(), 300);
    })

    it('random', () => {
        const pattern = [100, 200, 300, 400]
        let t = new Pattern(pattern);
        t.mode = 3;
        let first_pass = [];
        for (let i=0; i < 1000; i++) {
            first_pass.push(t.next());
        }

        t = new Pattern(pattern);
        t.mode = 3;
        let second_pass = [];
        for (let i=0; i < 1000; i++) {
            second_pass.push(t.next())
        }

        chai.assert.notDeepEqual(first_pass, second_pass)
    })


})