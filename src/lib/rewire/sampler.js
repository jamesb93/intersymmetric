import * as Tone from "tone";
import { Env } from '$lib/instruments/envelope.js';

class Sampler {
    constructor(buffers) {
        this.out = new Tone.Gain(0.5).toDestination();
        this.players = [];
        
        for (let i = 0; i < buffers.length; i++) {
            const sampler = new Tone.Player({
                fadeIn: 0.01,
                fadeOut: 0.01
            }).connect(this.out);
            sampler.buffer = buffers[i]
            this.players.push(sampler)
        }
    }
    trigger(time, sampleIdx, velocity, duration) {
        const play = this.players[sampleIdx];
        if (play.state === 'started') {
            play.stop()
        }

        play.start(time, 0.0, duration)
    }
}

export { Sampler };