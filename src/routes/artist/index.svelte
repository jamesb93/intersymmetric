<script>
	import { workshopID, room, socket } from '$lib/app.js';
	import { createRoomID } from '$lib/utility.js';
	import Grid from '$lib/components/Grid.svelte';

	const id = 'ewa-justke'
	$workshopID = 'artist';
    $room = id;
    const roomCode = createRoomID($workshopID, id);
    socket.emit('roomJoin', roomCode);
</script>

<div class="main-layout">
	<Grid mode={'synth'} context={'artist'} />
</div>
	
<style>
	.main-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>