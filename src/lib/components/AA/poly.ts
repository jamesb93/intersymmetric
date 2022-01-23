import { Queue } from './queue';

class Poly {
    voices: any[];
    index: number;
    queue: Queue;

    constructor(synth, numVoices) {
        this.voices = new Array(numVoices).fill(null);
        this.voices = this.voices.map(s => new synth);
        this.voices.forEach(s => s.out.toDestination())
        this.queue = new Queue(numVoices);
    }

    getFreeVoice() {
        return (
            this.voices.find(s => !s.busy)
            ||
            this.queue.peek()
            || 
            this.voices[0]
        );
    };

    trigger(time, duration, parameters) {
        const freeVoice = this.getFreeVoice();

        if (freeVoice !== undefined && freeVoice !== null) {
            this.queue.enqueue(freeVoice);
            freeVoice.trigger(time, duration, parameters);
        }
    }
}

export { Poly }