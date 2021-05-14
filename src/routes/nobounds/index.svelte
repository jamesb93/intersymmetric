
<script>
	import { browser } from '$app/env';
	import Grid from '$lib/components/Grid.svelte';
	import Snare from '$lib/components/Control/Snare.svelte';
	import Kick from "$lib/components/Control/Kick.svelte";
	import Metal from "$lib/components/Control/Metal.svelte";
	import FM from "$lib/components/Control/FM.svelte";
	import { metal1, metal2, fm1, fm2 } from '$lib/instruments/ensemble.js';
	import { workshopID } from '$lib/components/stores.js';
	$workshopID = "nobounds";
</script>

<div class="main-layout">
	<Grid />
	{#if browser}
	<div class="synth-controls">
		<Snare />
		<Kick />
		<Metal id="metal1" instrument={metal1} />
		<Metal id="metal2" instrument={metal2} />
		<FM id="fm1" instrument={fm1} />
		<FM id="fm2" instrument={fm2} />
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