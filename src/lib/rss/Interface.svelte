<script>
// @ts-nocheck

	import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';
	import MultiSlider2 from '$lib/common/multislider/MultiSlider2.svelte';
	const length = 4;

	import { s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15 } from '$lib/rss/app';

	$: page0 = [$s0, $s1, $s2, $s3]
	$: page1 = [$s4, $s5, $s6, $s7]

	let view = 0;

	export let patch;
</script>

{ page0 }

<!-- {#each data as d} -->
<!-- <MultiSlider 
	bind:data={page0}
	min={0}
	max={1.0}
	width={'200px'},
	height={'150px'},
	maxWidth={'200px'},
	maxHeight={'150px'},
	colour={'yellow'}
/> -->

<div>

<MultiSlider2 
	bind:data={page0}
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

<MultiSlider2 
	bind:data={page1}
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
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
</style>

