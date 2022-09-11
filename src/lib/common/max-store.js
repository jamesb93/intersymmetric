import { writable } from 'svelte/store';
import { sendMessage } from './patch-helpers';

export function maxStore(init, key, patch, transform) {
	const w = writable(init);
	w.subscribe(e => {
		if (transform ) {
			e = transform(e)
		}
		sendMessage(patch, key, e)
	})
	return w
}