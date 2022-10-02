import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

// Sockets
let socketAddr = import.meta.env.PROD ? 'wss://aaa.intersymmetric.xyz:49123' : 'ws://localhost:49123';

export const socket = io(socketAddr);

socket.on('connect', () => {
    console.log('connected to AAA websocket');
});

// Room Management
export const room = writable('');

export const numUsers = writable(0);
socket.on('users', x => numUsers.set(x));

export const speed = writable(3);
socket.on('speed', x => speed.set(x));

export const fm1_listener = writable(0);
socket.on('fm1_listener', x => fm1_listener.set(x));
export const fm2_listener = writable(0);
socket.on('fm2_listener', x => fm2_listener.set(x));
export const perc_listener = writable(0);
socket.on('perc_listener', x => perc_listener.set(x));

// Modes/Direction
export const a_mode = writable(0);
socket.on('a_mode', x => a_mode.set(x));
export const b_mode = writable(0);
socket.on('b_mode', x => b_mode.set(x));
export const c_mode = writable(0);
socket.on('c_mode', x => c_mode.set(x));

// Duration/Pattern
export const a_steps_0 = writable(5);
socket.on('a_steps_0', x => {
    a_steps_0.set(x);
});
export const a_steps_1 = writable(2);
socket.on('a_steps_1', x => a_steps_1.set(x));
export const a_steps_2 = writable(3);
socket.on('a_steps_2', x => a_steps_2.set(x));

export const b_steps_0 = writable(2);
socket.on('b_steps_0', x => b_steps_0.set(x));
export const b_steps_1 = writable(2);
socket.on('b_steps_1', x => b_steps_1.set(x));
export const b_steps_2 = writable(2);
socket.on('b_steps_2', x => b_steps_2.set(x));

export const c_steps_0 = writable(2);
socket.on('c_steps_0', x => c_steps_0.set(x));
export const c_steps_1 = writable(4);
socket.on('c_steps_1', x => c_steps_1.set(x));
export const c_steps_2 = writable(8);
socket.on('c_steps_2', x => c_steps_2.set(x));

// Synth Interface
export const fm1_freq_preset = writable(0);
socket.on('fm1_freq_preset', x => fm1_freq_preset.set(x));
export const fm1_mod_preset = writable(0);
socket.on('fm1_mod_preset', x => fm1_mod_preset.set(x));
export const fm1_shape_preset = writable(0);
socket.on('fm1_shape_preset', x => fm1_shape_preset.set(x));
export const fm2_freq_preset = writable(0);
socket.on('fm2_freq_preset', x => fm2_freq_preset.set(x));
export const fm2_mod_preset = writable(0);
socket.on('fm2_mod_preset', x => fm2_mod_preset.set(x));
export const fm2_shape_preset = writable(0);
socket.on('fm2_shape_preset', x => fm2_shape_preset.set(x));
export const perc_sound_preset = writable(0);
socket.on('perc_sound_preset', x => perc_sound_preset.set(x));
export const perc_transpose_preset = writable(0);
socket.on('perc_transpose_preset', x => perc_transpose_preset.set(x));
export const perc_shape_preset = writable(0);
socket.on('perc_shape_preset', x => perc_shape_preset.set(x));

export const calculated_speed = writable(1);

export const tala = writable([0, 0, 0]);
export const primary = 'hsl(324, 100%, 63%)';
export const primary_darker = 'hsl(324, 50%, 50%)';
