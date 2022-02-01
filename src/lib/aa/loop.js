import * as Tone from 'tone';
import { browser } from '$app/env';
import { Tala } from '$lib/aa/tala';
import { writable, get } from 'svelte/store';
import { Poly } from '$lib/aa/poly';
import { FMSynth } from '$lib/aa/instruments/fm';


let main_loop, sub_loop;
const ptn =  writable([]);
const time1 = writable(0);
const time2 = writable(1);
const tala = new Tala([2, 3, 4])

if (browser) {
    // Instruments
    const fm = new Poly(FMSynth, 16);

    main_loop = new Tone.Loop(time => {
        ptn.set( tala.next() );
        if (get(ptn)[1] === 0) {
            fm.trigger(time, null, [
                50, 1, 709, 363, 133520, 2240, 128291, 5, 2.933, 3.438, 1, 1, 0, 1.0
            ])
        }
        time1.set( time );
    }, 1)

    sub_loop = new Tone.Loop(time => {
        time2.set( time )
    }, 0.25)
}

export { main_loop, sub_loop, tala, ptn, time1, time2 };