///////////////////////////////////////////////////////////////////////////////////////
// This file creates instances of the instruments and composes a DSP Graph from them //
///////////////////////////////////////////////////////////////////////////////////////

// Import instruments and tone
import * as Tone from 'tone';
import { FMSynth } from './fm.js';
import { SnareSynth } from './snare.js';
import { KickSynth } from './kick.js';
import { MetalSynth } from './metal.js';

import { browser } from '$app/environment';

let kick, snare, metal1, metal2, fm1, fm2;

// Create instances of instruments
if (browser) {
    kick = new KickSynth();
    snare = new SnareSynth();
    metal1 = new MetalSynth();
    metal2 = new MetalSynth();
    fm1 = new FMSynth();
    fm2 = new FMSynth();

    // Compressor Options
    const compOpts = {
        attack: 10 / 1000,
        release: 300 / 1000,
        ratio: 2,
        knee: 5,
        threshold: -18
    };

    // Connect together the master bus DSP
    const masterLimiter = new Tone.Limiter(-3).toDestination();
    const verb = new Tone.Reverb(0.25).connect(masterLimiter);
    const masterComp = new Tone.Compressor(compOpts).fan(masterLimiter, verb);

    // Connect instruments to the master bus processing chain
    kick.out.fan(masterComp);
    snare.out.fan(masterComp);
    metal1.out.fan(masterComp);
    metal2.out.fan(masterComp);
    fm1.out.fan(masterComp);
    fm2.out.fan(masterComp);
    // export them so you can use them all around the app
}

export { snare, kick, metal1, metal2, fm1, fm2 };
