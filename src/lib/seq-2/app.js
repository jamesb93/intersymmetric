import { writable } from 'svelte/store';
import numeric_parameter from '$lib/common/parameters/numeric';
import enum_parameter from '$lib/common/parameters/enum';

import { env } from '$env/dynamic/public';
import { firebaseProdConfig, firebaseDevConfig } from '$lib/core';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { PUBLIC_FB_USERNAME, PUBLIC_FB_PASSWORD } from '$env/static/public';

let firebaseConfig = env.PUBLIC_MODE === 'dev' || 
    env.PUBLIC_MODE === undefined ? 
    firebaseDevConfig : firebaseProdConfig;

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
    const r = ref(db, `/seq-2/${room}/${path}`)

    onValue(r, s => {
        if (s.exists()) {
            state.set(s.val())
        } else {
            state.set(fallback)
        }
    })
}

// Room Management
export const room = writable('welcome');

export const state       = enum_parameter(0, [false, true]);
export const kick_param  = numeric_parameter(0, { min: 0, max: 1, step: 0.01 });
export const snare_param = numeric_parameter(0, { min: 0, max: 1, step: 0.01 });
export const fm_param    = numeric_parameter(0, { min: 0, max: 1, step: 0.01 });
export const metal_param = numeric_parameter(0, { min: 0, max: 1, step: 0.01 });

export const bpm        = numeric_parameter(120, { min: 1, max: 300, step: 1 });
export const direction  = enum_parameter(0, ['forward', 'rebound', 'wander'])
export const multiplier = enum_parameter(0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0.875, 0.75, 0.66, 0.5, 0.33, 0.25, 0.125, 0])
export const grid_start = numeric_parameter(0, { min: 0, max: 15, step: 1 });
export const grid_end   = numeric_parameter(15, { min: 0, max: 15, step: 1 });

export const kick_level = writable(0.0);
export const snare_level = writable(0.0);
export const metal_level = writable(0.0);
export const fm_level = writable(0.0);

// export const kick_params    = numeric_array_writable(new Array(4).fill(0.5), 0.0, 1.0);
// export const snare_params   = numeric_array_writable(new Array(4).fill(0.5), 0.0, 1.0);
// export const metal_params   = numeric_array_writable(new Array(4).fill(0.5), 0.0, 1.0);
// export const fm_params      = numeric_array_writable(new Array(4).fill(0.5), 0.0, 1.0);


export const hbp = 1005;
