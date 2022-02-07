import { wrap } from '../utility.js';

class Tala {
    constructor(pattern) {
        this.pattern = pattern || [];
        this.a = 0;
        this.b = 0;
        this.mode = 0;
        this.rebound_forward = true;
        // 0 forward
        // 1 backward
        // 2 rebound
        // 3 random
    }

    next() {
        const ptn = [this.a, this.b];

        this.b++;        
        this.b = wrap(this.b, 0, this.pattern[this.a]);
        
        if (this.b === 0) {

            if (this.mode === 0) {
                this.a++;
            } else if (this.mode === 1) {
                this.a--;
            } else if (this.mode === 2) {
                if (this.rebound_forward) {
                    this.a++
                    this.rebound_forward = !(this.a >= (this.pattern.length-1));
                } else {
                    this.a--
                    this.rebound_forward = this.a <= 0;
                }
            } else if (this.mode === 3) {
                this.a = Math.round( Math.random() * this.pattern.length );
            }

            this.a = wrap(this.a, 0, this.pattern.length);
        }
        
        return ptn;
    }
}

export { Tala }