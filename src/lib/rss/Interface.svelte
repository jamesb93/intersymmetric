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

	export let patch;
</script>

<div>
	{#each data as d, i}
		<MultiSlider 
		bind:data={ d }
		config={{
			width : 200,
			height : 200,
			maxWidth : '200px',
			maxHeight : '150px',
			colour : 'blue',
			min : 0.0,
			max : 1.0
		}}
	/>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 3em;
	}
</style>

