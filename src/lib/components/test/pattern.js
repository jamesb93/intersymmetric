import { wrap } from '$lib/utility';

class Pattern {
    constructor(pattern) {
        this.pattern = pattern;
    }

    next(count) {
        const index = wrap(count, 0, this.pattern.length);
        return this.pattern[index]
    }
}

export { Pattern }