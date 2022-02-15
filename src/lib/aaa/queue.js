class Queue {
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