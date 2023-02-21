<script>
	import Slider from './Slider.svelte';
	export let data = [];
	export let width = 100
	export let height = 100

	let mousedown = false;
</script>

<svg 
width={width} 
height={height} 
on:mousedown={() => mousedown = true}
on:mouseup={() => mousedown = false}
>
	{#each data as d, i}
		<Slider 
		bind:mousedown={mousedown}
		bind:data={data}
		value={d}
		index={i}
		parentHeight={height}
		parentWidth={width}
		/>
	{/each}
</svg>

<style>
	svg {
		border: 1px solid black;
	}
</style>