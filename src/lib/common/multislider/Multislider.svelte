<script>
	import Slider from './Slider.svelte';
	import { CircularBuffer } from '$lib/common/queue';
	export let data = [];
	export let width = 100
	export let height = 100

	let svg;
	let listening = false;
	let buf = new CircularBuffer(2)

    function moveHandler(e) {
		buf.enqueue(e);
    }

    function downHandler(e) {
        listening = true;
    }

    function upHandler(e) {
        listening = false;
    }

    // Once mouse is down we start to listen for points that have been passed through
    // We're essentially collecting tuples of points (1, 2, 10), (2, 10)
    // Once listening has begun, each tick of the mousemove handler looks at these tuples sand interpolates and updates the sliders accordingly
</script>

<svelte:window on:mousemove={moveHandler} on:mouseup={upHandler} />

<svg 
width={width} 
height={height} 
on:mousedown={downHandler}
bind:this={svg}
>
	{#each data as d, i}
		<Slider
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