import { writable, get } from 'svelte/store';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { app, authenticate } from '$lib/core';
import numeric_parameter from '$lib/common/parameters/numeric'
import enum_parameter from '$lib/common/parameters/enum';
import { create_2d_array } from '../utility';

export const db = getDatabase(app);

authenticate()

/**
 * Attaches a listener to a Firebase database reference and updates the state based on the received data.
 * If the data exists, it sets the state to the received value. Otherwise, it sets the state to the fallback value.
 * 
 * @param {string} room - The room identifier.
 * @param {string} path - The path to the data in the Firebase database.
 * @param {import('svelte/store').Writable<any>} state - The state object to be updated.
 * @param {any} fallback - The fallback value to be set if the data doesn't exist.
 */
export const attach = (room, path, state, fallback) => {
    const r = ref(db, `/seq1/${room}/${path}`)

    onValue(r, s => {
        if (s.exists()) {
            state.set(s.val())
        } else {
            state.set(fallback)
        }
    })
}

// A function used to set values on the firebase server
export const setDbValue = (identifier, value) => {
    set(ref(db, `/seq1/${get(room)}/${identifier}`), value)
}

export const room = writable('')
export const grid = writable(create_2d_array(6, 16, false))
export const clockMode = enum_parameter(0, ['Forward', 'Rebound', 'Wander'])

// sound control
export const sound0 = numeric_parameter(0.5, { min: 0, max: 1, step: 0.01 })
export const sound1 = numeric_parameter(0.5, { min: 0, max: 1, step: 0.01 })
export const sound2 = numeric_parameter(0.5, { min: 0, max: 1, step: 0.01 })
export const sound3 = numeric_parameter(0.5, { min: 0, max: 1, step: 0.01 })
export const sound4 = numeric_parameter(0.5, { min: 0, max: 1, step: 0.01 })
export const sound5 = numeric_parameter(0.5, { min: 0, max: 1, step: 0.01 })

// pitch control
export const pitch0 = numeric_parameter(0.0, { min: -24, max: 24, step: 1 })
export const pitch1 = numeric_parameter(0.0, { min: -24, max: 24, step: 1 })
export const pitch2 = numeric_parameter(0.0, { min: -24, max: 24, step: 1 })
export const pitch3 = numeric_parameter(0.0, { min: -24, max: 24, step: 1 })
export const pitch4 = numeric_parameter(0.0, { min: -24, max: 24, step: 1 })
export const pitch5 = numeric_parameter(0.0, { min: -24, max: 24, step: 1 })

// shape control
export const shape0 = numeric_parameter(1.0, { min: 0, max: 1, step: 0.01 })
export const shape1 = numeric_parameter(1.0, { min: 0, max: 1, step: 0.01 })
export const shape2 = numeric_parameter(1.0, { min: 0, max: 1, step: 0.01 })
export const shape3 = numeric_parameter(1.0, { min: 0, max: 1, step: 0.01 })
export const shape4 = numeric_parameter(1.0, { min: 0, max: 1, step: 0.01 })
export const shape5 = numeric_parameter(1.0, { min: 0, max: 1, step: 0.01 })

export const euclid0 = numeric_parameter(0, { min: 0, max: 16, step: 1 })
export const euclid1 = numeric_parameter(0, { min: 0, max: 16, step: 1 })
export const euclid2 = numeric_parameter(0, { min: 0, max: 16, step: 1 })
export const euclid3 = numeric_parameter(0, { min: 0, max: 16, step: 1 })
export const euclid4 = numeric_parameter(0, { min: 0, max: 16, step: 1 })
export const euclid5 = numeric_parameter(0, { min: 0, max: 16, step: 1 })

export const pitchOffset = numeric_parameter(0, { min: -24, max: 24, step: 1 })
export const length = numeric_parameter(0, { min: 0, max: 1, step: 0.001 })
export const startOffset = numeric_parameter(0, { min: 0, max: 16, step: 1 })
export const endOffset = numeric_parameter(16, { min: 1, max: 16, step: 1 })

export const bpm = numeric_parameter(120, { min: 5, max: 300, step: 1 })
export const clockMultiplierLookup = writable(0);