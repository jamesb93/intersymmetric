class Poly {
    voices: any[];
    index: number;

    constructor(synth, numVoices) {
        this.voices = new Array(numVoices).fill(null);
        this.voices = this.voices.map(s => new synth);
        this.voices.forEach(s => s.out.toDestination())
        this.index = 0;
    }

    trigger(time, duration, parameters) {
        this.voices[this.index].trigger(time, duration, parameters);
        this.index += 1;
        this.index = this.index % this.voices.length;
    }
}

export { Poly }