import { Tala } from './tala.js';

import * as assert from 'assert';

describe('construction', () => {
    it('should have a pattern', () => {
        const t = new Tala([1, 2, 3])
        assert.equal(t.pattern.length, 3);
        assert.equal(t.pattern[0], 1);
        assert.equal(t.pattern[1], 2);
        assert.equal(t.pattern[2], 3);
    })

    it ('should have no pattern', () => {
        const t = new Tala();
        assert.equal(t.pattern.length, 0);
    })
});