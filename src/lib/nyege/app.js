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

export const palette = {
	gold: 'rgb(148,108,53)',
	blue: 'rgb(148,108,53)',
	green: 'rgb(59,136,81)'
};

export const primary = palette.gold;
export const primary_darker = palette.blue;
