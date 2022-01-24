class Tala {
    constructor(pattern) {
        this.pattern = pattern || [];
        this.a = 0;
        this.b = 0;
    }

    next() {
        const ptn = [this.a, this.b];
        this.b++;
        this.b = this.b % this.pattern[this.a];

        if (this.b === 0) {
            this.a++;
            this.a = this.a % this.pattern.length;
        }
        return ptn;
    }
}

export { Tala }