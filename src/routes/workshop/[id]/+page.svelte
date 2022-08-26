<script>
	import { workshopID, room, socket } from '$lib/nobounds/app';
	import { createRoomID } from '$lib/utility';
	import Grid from '$lib/nobounds/components/Grid.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$workshopID = 'workshop';
	$room = data.id;
	socket.emit('roomJoin', createRoomID($workshopID, data.id));
</script>

<div class="main-layout">
	<Grid mode={'sample'} context={'workshop'} />
</div>

<style>
	.main-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
