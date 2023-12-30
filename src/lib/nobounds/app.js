import { writable } from 'svelte/store';
import numeric_parameter from '$lib/common/parameters/numeric';

export const pos = numeric_parameter(0, { min: 0, max: 15, step: 1})
export const prePos = numeric_parameter(0, { min: 0, max: 15, step: 1})
export const mouseDown = writable(false)

// High-Level Information
export const recentParamValue = writable(0);
export const recentParamName = writable('');
export const play = writable(false);

// Synthesiser Data
export const params = writable({
    snare: {
        frequency: 5000,
        attack: 0.01,
        decay: 0.498,
        sustain: 0.001,
        release: 0.49,
        order: 1,
        membraneFreq: 160
    },
    kick: {
        frequency: 43,
        octaves: 6,
        attack: 0.001,
        decay: 0.05,
        sustain: 1.0,
        release: 1.25,
        distortion: 0.0
    },
    metal1: {
        frequency: 28,
        harmonicity: 5.1,
        modulationIndex: 20.41,
        resonance: 3753,
        octaves: 2.75,
        order: 1,
        attack: 0.001,
        decay: 1.4,
        release: 0.2
    },
    metal2: {
        frequency: 5000,
        harmonicity: 0.2,
        modulationIndex: 22.21,
        resonance: 5000,
        octaves: 0,
        order: 1,
        attack: 0.001,
        decay: 1.4,
        release: 0.2
    },
    fm1: {
        frequency: 90,
        c1ratio: 1.0,
        c2ratio: 1.0,
        c3ratio: 1.0,
        fm2to1: 0.0,
        fm3to1: 0.0,
        fm3to2: 0.0,
        c1release: 1,
        c2release: 1,
        c3release: 1,
        op1gain: 1,
        op2gain: 1,
        op3gain: 1
    },
    fm2: {
        frequency: 110,
        c1ratio: 1.0,
        c2ratio: 1.0,
        c3ratio: 1.0,
        fm2to1: 0.0,
        fm3to1: 0.0,
        fm3to2: 0.0,
        c1release: 1,
        c2release: 1,
        c3release: 1,
        op1gain: 1,
        op2gain: 1,
        op3gain: 1
    }
});