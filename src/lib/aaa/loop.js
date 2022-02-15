import * as Tone from 'tone';
import { browser } from '$app/env';
import { Tala } from '$lib/aaa/talaa';
import { writable, get } from 'svelte/store';
import { Poly } from '$lib/aaa/polyy';
import { FMSynth } from '$lib/aaa/instruments/fmm';
import { MetalSynth } from '$lib/aaa/instruments/metall';
import { Pattern } from '$lib/aaa/patternn';

let duration_loop, subdiv_loop;
const ptn =  writable([]);
const time1 = writable(0);
const time2 = writable(1);

const tala = new Tala([5, 2, 3]);

const subdiv_pattern = new Pattern([2, 8]);
const subdiv_ratio = writable(2);

const duration_pattern = new Pattern(["16n", "16n"]);
const duration_interval = writable(1);

const base_speed = writable(1);


if (browser) {
    // const fm1 = new Poly(FMSynth, 32);
    const fm1 = new FMSynth();
    fm1.out.toDestination();
    const fm1_listener = writable(0); // 0 - top | 1 - durations | 2 - subdivisions

    // const fm2 = new Poly(FMSynth, 32);
    const fm2 = new FMSynth();
    fm2.out.toDestination();
    const fm2_listener = writable(1);

    const kick = new MetalSynth();
    kick.out.toDestination();

    // Instruments
    duration_loop = new Tone.Loop(time => {
        ptn.set( tala.next() );
        time1.set( time );
        
        const b = get(ptn)[1];
        if (get(fm1_listener) === 0 && b === 0 || get(fm1_listener) === 1) {
            console.log('bass trig')
            const p = [50, 1, 1, 473, 500, 0, 0, 0.5, 0.5, 0.5, 1, 1, 0, 1];
            fm1.trigger(time, null, p);
        };
        
        if (get(fm2_listener) === 0 && a === 0 || get(fm2_listener) === 1) {
            const p = [50, 2, 12, 120, 2500, 28304, 5575, 0.5, 0.5, 0.5, 0.3, 0.3, 0.322, 1]
            fm2.trigger(time, null, p);
        }
        const n = duration_pattern.next();
        duration_loop.interval = n;
        console.log(n)
    }, "16n");

    subdiv_loop = new Tone.Loop(time => {
        kick.trigger(time, 0.01, [3000, 0.3, 31.91, 1, 0.1, 1, 0.001, 1.884, 1])      
        subdiv_ratio.set( subdiv_pattern.next() );
        subdiv_loop.interval = duration_loop.interval / get(subdiv_ratio);
    }, "32n");
}

export { 
    duration_loop, subdiv_loop,
    tala, ptn, 
    time1, time2,
    subdiv_ratio, duration_interval,
    base_speed
};