class Poly {
    voices: any[];
    index: number;

    constructor(synth, numVoices) {
        this.voices = new Array(numVoices).fill(new synth);
        this.voices.forEach(s => s.out.toDestination())
        this.index = 0;
    }

    trigger(time, velocity, duration) {
        this.index += 1;
        this.index = this.index % this.voices.length;
        this.voices[this.index].trigger(time, velocity, duration);
    }
}

export { Poly }