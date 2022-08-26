<script>
	import { room, socket } from '$lib/nyege/app';
	import { createRoomID } from '$lib/utility';
	import Instance from '$lib/nyege/Instance.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	console.log(data);

	$room = data.id;
	socket.emit('join_room', createRoomID('nyege', data.id));
</script>

<!-- stuff -->
<Instance />
