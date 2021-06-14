
<script>
	import { browser } from '$app/env';
	import Grid from '$lib/components/Grid.svelte';
	import Snare from '$lib/components/Control/Snare.svelte';
	import Kick from "$lib/components/Control/Kick.svelte";
	import Metal from "$lib/components/Control/Metal.svelte";
	import FM from "$lib/components/Control/FM.svelte";
	import { metal1, metal2, fm1, fm2 } from '$lib/instruments/ensemble.js';
	import { workshopID, room } from '$lib/components/stores.js';
	$workshopID = "nobounds";
</script>

<div class="main-layout">
	<Grid />
	{#if browser}
	<div class="synth-controls">
		<Snare hide={ !$room.includes('test') } />
		<Kick hide={ !$room.includes('test') } />
		<Metal id="metal1" instrument={metal1} hide={ !$room.includes('test') } />
		<Metal id="metal2" instrument={metal2} hide={ !$room.includes('test') } />
		<FM id="fm1" instrument={fm1} hide={ !$room.includes('test') } />
		<FM id="fm2" instrument={fm2} hide={ !$room.includes('test') } />
	</div>
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