import { writable } from 'svelte/store';

const rows = 6;
const cells = 16;

export const room = writable('default');

export const grid = writable(
	Array.from({ length: rows }, () =>
		Array.from({ length: cells }, () => false)
	)
)