import { writable } from 'svelte/store';
import { env } from '$env/dynamic/public';
import { initializeApp } from 'firebase/app';
import { firebaseProdConfig, firebaseDevConfig } from '$lib/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD } from '$env/static/public';

const firebaseConfig =
    env.PUBLIC_MODE === 'dev' || env.PUBLIC_MODE === undefined
        ? firebaseDevConfig
        : firebaseProdConfig;

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const auth = getAuth(app);
async function authenticate() {
    await signInWithEmailAndPassword(auth, PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw new Error(errorMessage);
        });
}

authenticate();

/**
 * Bind a value to a firebase setter
 * @param {string} project – the name of the project
 * @param {string} room – the name of the room
 * @param {string} path – the path of the parameter
 * @param {import('svelte/store').writable} state -
 * @param {*} fallback – if the retrieved state is invalid use this is as a fallback
 */
export const attach = (room, path, state, fallback) => {
    const r = ref(db, `/rss/${room}/${path}`);

    onValue(r, (s) => {
        if (s.exists()) {
            state.set(s.val());
        } else {
            state.set(fallback);
        }
    });
};

// All the sliders...
export const s0 = writable(0.1);
export const s1 = writable(0.2);
export const s2 = writable(0.3);
export const s3 = writable(0.4);
export const s4 = writable(0.5);
export const s5 = writable(0.6);
export const s6 = writable(0.7);
export const s7 = writable(0.8);
export const s8 = writable(0.9);
export const s9 = writable(1.0);
export const s10 = writable(0.0);
export const s11 = writable(0.1);
export const s12 = writable(0.2);
export const s13 = writable(0.3);
export const s14 = writable(0.4);
export const s15 = writable(0.5);
