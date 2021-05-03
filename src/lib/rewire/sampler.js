import * as Tone from "tone";
import { Env } from '$lib/instruments/envelope.js';

class Sampler {
    constructor(buffers) {
        this.players = [];
        this.envelope = new Env(0.01, 10.0);
        this.out = new Tone.Gain(1.0).toDestination();
        this.envelope.out.connect(this.out);
        
        for (let i=0; i < buffers.length; i++) {
            const sampler = new Tone.Player({
                fadeIn: 0.01,
                fadeOut: 0.01
            }).connect(this.envelope.out);
            sampler.buffer = buffers[i]
            this.players.push(sampler)
        }
    }
    trigger(time, sampleIdx, velocity, duration) {
        const play = this.players[sampleIdx];
        this.envelope.trigger(time, velocity)
        play.start(time, 0.0, duration)
    }
}

export { Sampler };