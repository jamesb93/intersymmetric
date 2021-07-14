<script context="module">
	export async function load({ page }) {
        return { 
            props: {id: page.params.id}
        };
	}
</script>

<script>
    import { browser } from '$app/env';
	import { workshopID, room, socket } from '$lib/app.js';
	import { createRoomID } from '$lib/utility.js';
    export let id;

	$workshopID = "nobounds.sample";
    const roomCode = createRoomID($workshopID, id);

    $room = id;
    socket.emit('roomJoin', roomCode);
</script>

<div class="main-layout">
	<Grid />
	{#if browser}
	<!-- Samplers -->
	{/if}
</div>
	
<style>
	.main-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.synth-controls {
		display: flex;
		flex-direction: row;
	}
</style>