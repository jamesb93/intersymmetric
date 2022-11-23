import { firebaseConfig } from '$lib/core';
import { writable } from 'svelte/store';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, onDisconnect } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD } from '$env/static/public';

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const auth = getAuth(app);
const authenticate = async() => {
    await signInWithEmailAndPassword(auth, PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
};

authenticate()

export const attach = (room, path, state, fallback) => {
    const r = ref(db, `/nnnb/${room}/${path}`)

    onValue(r, s => {
        if (s.exists()) {
            state.set(s.val())
        } else {
            state.set(fallback)
        }
    })
}

// Room Management
export const room = writable('room1');
export const prevroom = writable('room1');
export const players = writable(0);
export const rate = writable(170);
export const pips = writable([0, 0, 0, 0]);
export const globalCycle = writable(16);

export const buf0 = writable(0);
export const buf1 = writable(0);
export const buf2 = writable(0);
export const buf3 = writable(0);
export const buf4 = writable(0);
export const buf5 = writable(0);
export const buf6 = writable(20);

export const pitch0 = writable(0);
export const pitch1 = writable(0);
export const pitch2 = writable(0);
export const pitch3 = writable(0);
export const pitch4 = writable(0);
export const pitch5 = writable(0);

export const len0 = writable(1);
export const len1 = writable(1);
export const len2 = writable(1);
export const len3 = writable(1);
export const len4 = writable(1);
export const len5 = writable(1);
export const len6 = writable(1);

// Polymetric
export const div0 = writable(16);
export const div1 = writable(6);
export const div2 = writable(3);
export const div3 = writable(3);

export const range0 = writable(16);
export const range1 = writable(14);
export const range2 = writable(8);
export const range3 = writable(16);

// Retriggers
export const retrig0 = writable(6);
export const retrig1 = writable(6);
export const retrigGate0 = writable(0);
export const retrigGate1 = writable(0);

// Chord
export const chordfollow = writable(0);
export const chordspread = writable(5);
export const chordlow = writable(10);
export const chordhigh = writable(90);
export const scale = writable(0);

export const palette = {
    gold: 'rgb(148,108,53)',
    blue: 'rgb(148,108,53)',
    green: 'rgb(59,136,81)'
};

export const hbp = 1005;
