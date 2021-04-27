import { io } from "socket.io-client";
import { writable } from 'svelte/store';
import { browser } from '$app/env';

let socketAddr = import.meta.env.PROD ? "wss://8f43.xyz:4300" : "ws://localhost:4300"
export const socket = io(socketAddr);

export const numUsers = writable(0);

let storedRoom;

if (browser) {
    storedRoom = localStorage.getItem("mfrtjbcode") || null
}

if (storedRoom === null) {
    storedRoom = ""
}

export const room = writable(storedRoom)
if (storedRoom !== "") {
    socket.emit('roomJoin', storedRoom)
    room.set(storedRoom)
}

export const recentParamValue = writable('')
export const recentParamName = writable('')
socket.on('connect', () => {
    console.log('connected to ', socketAddr)
})

socket.on('numUsers', num => numUsers.set(num)); 
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
// socket.on('play', x => {
//     if (get(userInteracted) === true)
//         play.set(x)
// });

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
    transforms: true
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
        velocityList: ["1"]
    },
    kick : {
        frequency : 43,
        octaves : 6,
        attack : 0.001,
        decay : 0.05,
        sustain : 1.0,
        release : 1.25,
        distortion : 0.0,
        velocityList: ["1"],
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
        velocityList: ["1"]

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
        velocityList: ["1"]
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
        velocityList: ["1"]     
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
        velocityList: ["1"]
    }
});
socket.on('params', x => params.set(x)); // get all params in one message

