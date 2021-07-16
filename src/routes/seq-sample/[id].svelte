<script context="module">
	export async function load({ page }) {
        return { 
            props: {id: page.params.id}
        };
	}
</script>

<script>
    import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { workshopID, room, socket } from '$lib/app.js';
	import { createRoomID } from '$lib/utility.js';
	import Grid from '$lib/components/Grid.svelte';
    export let id;

	$workshopID = "nobounds.sample";
    $room = id;
    const roomCode = createRoomID($workshopID, id);
    socket.emit('roomJoin', roomCode);
</script>

<div class="main-layout">
	<Grid mode={'sample'} />
</div>
	
<style>
	.main-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>