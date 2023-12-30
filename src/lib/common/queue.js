export class CircularBuffer {
    constructor(size) {
        this.buffer = new Array(size);
        this.front = 0;
        this.rear = 0;
        this.count = 0;
    }

    enqueue(item) {
        if (this.isFull()) {
            this.dequeue();
        }
        this.buffer[this.rear] = item;
        this.rear = (this.rear + 1) % this.buffer.length;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Buffer is empty');
        }
        const item = this.buffer[this.front];
        this.front = (this.front + 1) % this.buffer.length;
        this.count--;
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error('Buffer is empty');
        }
        return this.buffer[this.front];
    }

    get(i) {
        if (this.isEmpty()) {
            throw new Error('Buffer is empty');
        }

        if (i < 0 || i > this.buffer.length) {
            throw new Error('Index is out of range');
        }

        return this.buffer[i];
    }

    isFull() {
        return this.count === this.buffer.length;
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    clear() {
        this.front = 0;
        this.rear = 0;
        this.count = 0;
        this.buffer.fill(null);
    }
}
