import { io } from "socket.io-client";
import { writable } from 'svelte/store';

// Sockets
let socketAddr = import.meta.env.PROD ? "wss://interbackend.xyz:4300" : "ws://localhost:4300"

export const socket = io(socketAddr);

socket.on('connect', () => {
    console.log('connected to ', socketAddr)
})

export const userMessage = writable('');
socket.on('userMessage', x => userMessage.set(x));

// Velocity Patterns
export const velocityPattern = writable(0);
socket.on('velocityPattern', x => velocityPattern.set(x));

// Sample Data

// No Bounds MetaData // Interpolation
export const trackSound = writable( new Array(6).fill(0.5) );
export const trackPitch = writable( new Array(6).fill(0.0) );
export const trackShape = writable( new Array(6).fill(1.0) );
socket.on('trackPitch', x => trackPitch.set(x));
socket.on('trackShape', x => trackShape.set(x));

// Room Management
export const workshopID = writable("");
export const numUsers = writable(0);
export const room = writable('')
socket.on('numUsers', x => numUsers.set(x)); 

// High-Level Information
export const recentParamValue = writable('')
export const recentParamName = writable('')
export const recentSample = writable(null);
export const userInteracted = writable(false);

// Sequencer Data
export const maxCells = writable(32);
socket.on('maxCells', x => maxCells.set(x));

export const mirrorPoint = writable(8);
socket.on('mirrorPoint', x => mirrorPoint.set(x));

export const prevInsertions = writable([]);
socket.on('prevInsertions', x => prevInsertions.set(x));

export const grid = writable([]);
export const gridValid = writable(false);
socket.on('grid', x => {
    grid.set(x);
    gridValid.set(true);
})

export const play = writable(false);

export const velocity = writable(1.0);
socket.on('velocity', x => velocity.set(x));

export const states = writable({
    pitchOffset: true,
    maxCells: true,
    mirrorPoint: true,
    grid: true,
    bpm: true,
    euclid: true,
    offset: true,
    globalVelocity: true,
    globalLength: true,
    multiplier: true,
    transforms: true,
    velocityPattern: true,
});
socket.on('enabledStates', x => states.set(x));

export const pitchOffset = writable(0);
socket.on('pitchOffset', x => pitchOffset.set(x));

export const length = writable(1.0);
socket.on('length', x => length.set(x));

export const euclidSteps = writable([0, 0, 0, 0, 0, 0]);
socket.on('euclid', x => euclidSteps.set(x));

export const offset = writable({start: 1, end: 16});
socket.on('clock::offset', x => offset.set(x));

export const bpm = writable(120);
socket.on('bpm', x => bpm.set(x));

export const clockMode = writable();
socket.on('clock::mode', x => clockMode.set(x));

export const clockMultiplierLookup = writable(0);
socket.on('clock::multiplier', x => clockMultiplierLookup.set(x));

export const sampleSelectors = writable([0, 0, 0, 0, 0, 0]);
socket.on('sampleSelectors', x => sampleSelectors.set(x));

export const trackGains = writable([1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
socket.on('trackGains', x => trackGains.set(x));

export const trackRates = writable([1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
socket.on('trackRates', x => trackRates.set(x));

export const trackLengths = writable([5.0, 5.0, 5.0, 5.0, 5.0, 5.0]);
socket.on('trackLengths', x => trackLengths.set(x));

export const playbackRate = writable(1.0);
socket.on('playbackRate', x => playbackRate.set(x));

// Synthesiser Data
export const params = writable({
    snare : {
        frequency : 5000,
        attack: 0.01,
        decay: 0.498,
        sustain: 0.001,
        release: 0.49,
        order : 1,
        membraneFreq: 160,
    },
    kick : {
        frequency : 43,
        octaves : 6,
        attack : 0.001,
        decay : 0.05,
        sustain : 1.0,
        release : 1.25,
        distortion : 0.0,
    },
    metal1 : {
        frequency : 28,
        harmonicity : 5.1,
        modulationIndex : 20.41,
        resonance : 3753,
        octaves : 2.75,
        order : 1,
        attack: 0.001,
        decay: 1.4,
        release: 0.2,

    },
    metal2 : {
        frequency : 5000,
        harmonicity : 0.2,
        modulationIndex : 22.21,
        resonance : 5000,
        octaves : 0,
        order : 1,
        attack: 0.001,
        decay: 1.4,
        release: 0.2,
    },
    fm1 : {
        frequency : 90,
        c1ratio : 1.0,
        c2ratio : 1.0,
        c3ratio : 1.0,
        fm2to1 : 0.0,
        fm3to1 : 0.0,
        fm3to2 : 0.0,
        c1release : 1,
        c2release : 1,
        c3release : 1,
        op1gain : 1,
        op2gain : 1,
        op3gain : 1,
    },
    fm2 : {
        frequency : 110,
        c1ratio : 1.0,
        c2ratio : 1.0,
        c3ratio : 1.0,
        fm2to1 : 0.0,
        fm3to1 : 0.0,
        fm3to2 : 0.0,
        c1release : 1,
        c2release : 1,
        c3release : 1,
        op1gain : 1,
        op2gain : 1,
        op3gain : 1,
    }
});
socket.on('params', x => params.set(x)); // get all params in one message