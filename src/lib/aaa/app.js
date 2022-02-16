import { io } from "socket.io-client";
import { writable } from 'svelte/store';

// Sockets
let socketAddr = import.meta.env.PROD ? "wss://aaabackend.xyz:6000" : "ws://localhost:6000"

export const socket = io(socketAddr);

socket.on('connect', () => { console.log('connected to AAA websocket') });

// Room Management
export const room = writable('')
export const numUsers = writable(0);
socket.on('numUsers', x => numUsers.set(x));

export const speed = writable(1);

export const fm1_listener = writable(0);
export const fm2_listener = writable(0);
export const perc_listener = writable(0);

// Modes/Direction
export const a_mode = writable(0);
export const b_mode = writable(0);
export const c_mode = writable(0);

// Duration/Pattern
export const a_steps = writable([5, 2, 3]);
export const b_steps = writable([1000, 1000, 1000]);
export const c_steps = writable([1, 2, 3]);

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

export const fm1_listener = writable(0);
export const fm2_listener = writable(0);
export const perc_listener = writable(0);