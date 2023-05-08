<script>
// @ts-nocheck

	import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';

	import { s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15 } from '$lib/rss/app';

	$: data = [
		[$s0, $s1, $s2, $s3],
		[$s4, $s5, $s6, $s7],
		[$s8, $s9, $s10, $s11],
		[$s12, $s13, $s14, $s15]
	]

	let view = 0;

	$: dataView = data[view]

	export let patch;
</script>

<div class="wrapper">

<MultiSlider 
bind:data={ dataView }
config={{
	width : 400,
	maxWidth : '100%',
	height : '80vh',
	maxHeight : '80vh',
	bgColour : 'yellow',
	colour : 'black',
	min : 0.0,
	max : 1.0
}}
/>

<div class='view-toggle'>
	{#each new Array(4) as x, i}
	<button class:selected={view===i} class='view-tog' on:click={() => { view = i }}></button>
	{/each}
</div>

</div>


<style>
	.wrapper {
		width: 100%;
		height: 100%;
		min-height: 100%;
	}
	.view-toggle {
		display: flex;
		flex-direction: row;
		height: 100%;
		border-top: 1px solid black;
	}
	.view-tog {
		height: 100%;
		width: 25%;
		background-color: yellow;
		border: none;
		margin-left: 1px;
		margin-right: 1px;
	}

	.selected {
		background-color: black;
	}
</style>