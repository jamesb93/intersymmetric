import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

// Sockets
let socketAddr = import.meta.env.PROD ? 'wss://nyege-server.intersymmetric.xyz:49124' : 'ws://localhost:49124';

export const socket = io(socketAddr);

socket.on('connect', () => {
    console.log('connected to nyegenyege websocket');
});

// Room Management
export const room = writable('');

export const num_users = writable(0);
socket.on('num_users', x => num_users.set(x));

// Common
export const pips = writable([0, 0, 0, 0]);
export const rate = writable(0.2);
socket.on('rate', x => { rate.set(x); console.log(x) });
export const globalCycle = writable(16);
socket.on('globalCycle', x => globalCycle.set(x));

export const buf0 = writable(0);
export const buf1 = writable(13);
export const buf2 = writable(25);
export const buf3 = writable(7);
export const buf4 = writable(0);
export const buf5 = writable(0);
export const buf6 = writable(0);
socket.on('buf0', x => buf0.set(x));
socket.on('buf1', x => buf1.set(x));
socket.on('buf2', x => buf2.set(x));
socket.on('buf3', x => buf3.set(x));
socket.on('buf4', x => buf4.set(x));
socket.on('buf5', x => buf5.set(x));
socket.on('buf6', x => buf6.set(x));

export const pitch0 = writable(0);
export const pitch1 = writable(0);
export const pitch2 = writable(2);
export const pitch3 = writable(0);
export const pitch4 = writable(0);
export const pitch5 = writable(0);
socket.on('pitch0', x => pitch0.set(x));
socket.on('pitch1', x => pitch1.set(x));
socket.on('pitch2', x => pitch2.set(x));
socket.on('pitch3', x => pitch3.set(x));
socket.on('pitch4', x => pitch4.set(x));
socket.on('pitch5', x => pitch5.set(x));

export const len0 = writable(1);
export const len1 = writable(1);
export const len2 = writable(1);
export const len3 = writable(1);
export const len4 = writable(1);
export const len5 = writable(1);
export const len6 = writable(1);
socket.on('len0', x => len0.set(x));
socket.on('len1', x => len1.set(x));
socket.on('len2', x => len2.set(x));
socket.on('len3', x => len3.set(x));
socket.on('len4', x => len4.set(x));
socket.on('len5', x => len5.set(x));
socket.on('len6', x => len6.set(x));

// Polymetric
export const div0 = writable(16);
export const div1 = writable(6);
export const div2 = writable(3);
export const div3 = writable(3);
socket.on('div0', x => div0.set(x));
socket.on('div1', x => div1.set(x));
socket.on('div2', x => div2.set(x));
socket.on('div3', x => div3.set(x));
export const range0 = writable(16);
export const range1 = writable(14);
export const range2 = writable(8);
export const range3 = writable(16);
socket.on('range0', x => range0.set(x));
socket.on('range1', x => range1.set(x));
socket.on('range2', x => range2.set(x));
socket.on('range3', x => range3.set(x));

// Retriggers
export const retrig0 = writable(0);
socket.on('retrig0', x => retrig0.set(x));
export const retrig1 = writable(0);
socket.on('retrig1', x => retrig1.set(x));

// Chord
export const chordfollow = writable(0);
export const chordspread = writable(5);
export const chordlow = writable(10);
export const chordhigh = writable(90);
export const scale = writable(0);
socket.on('chordlow', x => chordlow.set(x));
socket.on('chordfollow', x => chordfollow.set(x));
socket.on('chordspread', x => chordspread.set(x));
socket.on('chordhigh', x => chordhigh.set(x));
socket.on('scale', x => scale.set(x));

export const palette = {
    gold: 'rgb(148,108,53)',
    blue: 'rgb(148,108,53)',
    green: 'rgb(59,136,81)'
};

export const primary = palette.gold;
export const primary_darker = palette.blue;
