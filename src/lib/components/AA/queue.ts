import { KickSynth } from '$lib/components/AA/instruments/kick';
import { MetalSynth } from '$lib/components/AA/instruments/metal';
import { SnareSynth } from '$lib/components/AA/instruments/snare';
import { FMSynth } from '$lib/components/AA/instruments/fm';

class Queue {
    elements: FMSynth[] | SnareSynth[] | MetalSynth[] | KickSynth[];
    queueSize: number;

    constructor(queueSize) {
        this.elements = [];
        this.queueSize = queueSize;
    }

    enqueue(e) {
        if (this.elements.length === this.queueSize) {
            this.elements.shift();
        }
        this.elements.push(e);
    }

    dequeue() {
        this.elements.shift();
    }

    peek() {
        return this.elements[0];
    }
}

export { Queue }