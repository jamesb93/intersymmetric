<script>
// @ts-nocheck
	import { sendDeviceMessage } from '@jamesb93/rnbo-svelte';
	import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';
	import { s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15 } from '$lib/rss/app';
	export let patch;

	$: data = [
		[$s0, $s1, $s2, $s3],
		[$s4, $s5, $s6, $s7],
		[$s8, $s9, $s10, $s11],
		[$s12, $s13, $s14, $s15]
	]

	let view = 0;
	let active = false;

	
	$: dataView = data[view]
	
	$: sendDeviceMessage(patch, 'on_off', [active]);
</script>

<div class='state' class:stateon={active} on:click={() => {active = !active}}></div>

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

<svelte:window on:keypress|preventDefault={(e) => {
	if (e.code === 'Space') {
		active = !active;
		// send to patch
	}
}} />


<style>
	.state {
		touch-action: none;
		position: absolute;
		top: 10;
		left: 10;
		width: 25px;
		height: 25px;
		background-color: red;
	}

	.stateon {
		background-color: green;
	}
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