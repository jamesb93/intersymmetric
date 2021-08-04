import { writable } from 'svelte/store';

export const sampleResource = 'https://f000.backblazeb2.com/file/intersymmetric';
export const info = writable('')

// Sample Data
export const samplesLoaded = writable(false);
export const numSamples = writable([0,0,0,0,0,0]);
export const numLoadedSamples = writable(0);
export const totalNumSamples = writable(0);