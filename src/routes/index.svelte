
<script>
	import { fade } from "svelte/transition";
	import { 
        room, recentParamName, recentParamValue
    } from "./_components/stores.js";
	import Grid from "./_components/Grid.svelte";
	import Snare from "./_components/Control/Snare.svelte";
	import Kick from "./_components/Control/Kick.svelte";
	import Metal from "./_components/Control/Metal.svelte";
	import FM from "./_components/Control/FM.svelte";
	import Header from "./_components/Header.svelte";
	import { metal1, metal2, fm1, fm2 } from '$lib/instruments/ensemble.js';
	import { browser } from '$app/env';
</script>

<Header />

<main>
	<!-- {$recentParamName} | {$recentParamValue} -->
	{#if $room !== ""}
	{#if browser}
		<div class="main-layout" transition:fade="{{duration: 300}}">
			<Grid />
			<div class="synth-controls">
				<Snare />
				<Kick />
				<Metal id="metal1" instrument={metal1} />
				<Metal id="metal2" instrument={metal2} />
				<FM id="fm1" instrument={fm1} />
				<FM id="fm2" instrument={fm2} />
			</div>
		</div>
	{/if}
	{/if}
</main>

	
<style>
	.main-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 25px;
	}

	.synth-controls {
		display: flex;
		flex-direction: row;
	}
</style>