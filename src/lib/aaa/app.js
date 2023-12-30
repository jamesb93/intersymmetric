import { writable } from 'svelte/store';
import { env } from '$env/dynamic/public';
import { PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD } from '$env/static/public';
import { firebaseProdConfig, firebaseDevConfig } from '$lib/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig =
    env.PUBLIC_MODE === 'dev' || env.PUBLIC_MODE === undefined
        ? firebaseDevConfig
        : firebaseProdConfig;

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const auth = getAuth(app);
const authenticate = async () => {
    await signInWithEmailAndPassword(auth, PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
};

authenticate();

export const attach = (room, path, state, fallback) => {
    const r = ref(db, `/aaa/${room}/${path}`);

    onValue(r, (s) => {
        if (s.exists()) {
            state.set(s.val());
        } else {
            state.set(fallback);
        }
    });
};

// Room Management
export const room = writable('');

export const numUsers = writable(0);
export const speed = writable(3);

export const fm1_listener = writable(0);
export const fm2_listener = writable(0);
export const perc_listener = writable(0);

// Modes/Direction
export const a_mode = writable(0);
export const b_mode = writable(0);
export const c_mode = writable(0);

// Duration/Pattern
export const a_steps_0 = writable(5);
export const a_steps_1 = writable(2);
export const a_steps_2 = writable(3);

export const b_steps_0 = writable(2);
export const b_steps_1 = writable(2);
export const b_steps_2 = writable(2);

export const c_steps_0 = writable(2);
export const c_steps_1 = writable(4);
export const c_steps_2 = writable(8);

// Synth Interface
export const fm1_freq_preset = writable(0);
export const fm1_mod_preset = writable(0);
export const fm1_shape_preset = writable(0);
export const fm2_freq_preset = writable(0);
export const fm2_mod_preset = writable(0);
export const fm2_shape_preset = writable(0);
export const perc_sound_preset = writable(0);
export const perc_transpose_preset = writable(0);
export const perc_shape_preset = writable(0);

export const calculated_speed = writable(1);

export const tala = writable([0, 0, 0]);
export const primary = 'hsl(324, 100%, 63%)';
export const primary_darker = 'hsl(324, 50%, 50%)';
