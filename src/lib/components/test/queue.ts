import { KickSynth } from '$lib/components/test/instruments/kick';
import { MetalSynth } from '$lib/components/test/instruments/metal';
import { SnareSynth } from '$lib/components/test/instruments/snare';
import { FMSynth } from '$lib/components/test/instruments/fm';

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