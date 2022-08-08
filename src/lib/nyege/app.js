import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

// Sockets
let socketAddr = import.meta.env.PROD
	? 'wss://nyege-server.intersymmetric.xyz:49124'
	: 'ws://localhost:49124';

export const socket = io(socketAddr);

socket.on('connect', () => {
	console.log('connected to nyegenyege websocket');
});

// Room Management
export const room = writable('');

export const num_users = writable(0);
socket.on('num_users', (x) => num_users.set(x));

// Common
export const rate = writable(120);
socket.on('rate', (x) => rate.set(x));

export const a_sound = writable(0);
export const b_sound = writable(0);
export const c_sound = writable(0);
export const d_sound = writable(0);
export const e_sound = writable(0);
export const f_sound = writable(0);
export const g_sound = writable(0);
socket.on('a_sound', (x) => a_sound.set(x));
socket.on('b_sound', (x) => b_sound.set(x));
socket.on('c_sound', (x) => c_sound.set(x));
socket.on('d_sound', (x) => d_sound.set(x));
socket.on('e_sound', (x) => e_sound.set(x));
socket.on('f_sound', (x) => f_sound.set(x));
socket.on('g_sound', (x) => g_sound.set(x));
export const a_pitch = writable(0);
export const b_pitch = writable(0);
export const c_pitch = writable(0);
export const d_pitch = writable(0);
export const e_pitch = writable(0);
export const f_pitch = writable(0);
export const g_pitch = writable(0);
socket.on('a_pitch', (x) => a_pitch.set(x));
socket.on('b_pitch', (x) => b_pitch.set(x));
socket.on('c_pitch', (x) => c_pitch.set(x));
socket.on('d_pitch', (x) => d_pitch.set(x));
socket.on('e_pitch', (x) => e_pitch.set(x));
socket.on('f_pitch', (x) => f_pitch.set(x));
socket.on('g_pitch', (x) => g_pitch.set(x));
export const a_length = writable(250);
export const b_length = writable(250);
export const c_length = writable(250);
export const d_length = writable(250);
export const e_length = writable(250);
export const f_length = writable(250);
export const g_length = writable(250);
socket.on('a_length', (x) => a_length.set(x));
socket.on('b_length', (x) => b_length.set(x));
socket.on('c_length', (x) => c_length.set(x));
socket.on('d_length', (x) => d_length.set(x));
socket.on('e_length', (x) => e_length.set(x));
socket.on('f_length', (x) => f_length.set(x));
socket.on('g_length', (x) => g_length.set(x));

// Polymetric
export const a_subdiv = writable(16);
export const b_subdiv = writable(16);
export const c_subdiv = writable(16);
export const d_subdiv = writable(16);
socket.on('a_subdiv', (x) => a_subdiv.set(x));
socket.on('b_subdiv', (x) => b_subdiv.set(x));
socket.on('c_subdiv', (x) => c_subdiv.set(x));
socket.on('d_subdiv', (x) => d_subdiv.set(x));
export const a_range = writable(16);
export const b_range = writable(16);
export const c_range = writable(16);
export const d_range = writable(16);
socket.on('a_range', (x) => a_range.set(x));
socket.on('b_range', (x) => b_range.set(x));
socket.on('c_range', (x) => c_range.set(x));
socket.on('d_range', (x) => d_range.set(x));

// Retriggers

// Chord

export const palette = {
	gold: 'rgb(148,108,53)',
	blue: 'rgb(148,108,53)',
	green: 'rgb(59,136,81)'
};

export const primary = palette.gold;
export const primary_darker = palette.blue;
