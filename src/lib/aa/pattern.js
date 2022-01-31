import { wrap } from '$lib/utility';

class Pattern {
    constructor(pattern) {
        this.pattern = pattern;
        this.mode =  0
        // 0 forward
        // 1 backward
        // 2 rebound
        // 3 random

    next(count) {
        const index = wrap(count, 0, this.pattern.length);
        return this.pattern[index]
    }
}

export { Pattern }