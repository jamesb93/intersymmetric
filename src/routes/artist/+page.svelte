<script>
	import { workshopID, room, socket } from '$lib/nobounds/app.js';
	import { createRoomID } from '$lib/utility.js';
	import Grid from '$lib/nobounds/components/Grid.svelte';

	const id = 'ewa-justka';
	$workshopID = 'artist';
	$room = id;
	const roomCode = createRoomID($workshopID, id);
	socket.emit('roomJoin', roomCode);
</script>

<div class="main-layout">
	<Grid mode={'sample'} context={'artist'} />
</div>

<style>
	.main-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
