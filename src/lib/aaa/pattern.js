import { wrap } from '../utility.js'

class Pattern {
    constructor(pattern) {
        this.pattern = pattern;
        this.mode =  0;
        this.count = 0;
        this.rebound_forward = true;
        // 0 forward
        // 1 backward
        // 2 rebound
        // 3 random
    }

    next() {
        let res = this.pattern[this.count];
        
        // increment internal counter
        if (this.mode === 0) {
            this.count++
        } else if (this.mode === 1) {
            this.count--
        } else if (this.mode === 2) {
            if (this.rebound_forward) {
                this.count++
                this.rebound_forward = !(this.count >= (this.pattern.length-1));
            } else {
                this.count--
                this.rebound_forward = this.count <= 0;
            }
        } else if (this.mode === 3) {
            this.count  = Math.round( Math.random() * this.pattern.length ); 
        }

        this.count = wrap(this.count, 0, this.pattern.length);
        return res
    }
}

export { Pattern }
