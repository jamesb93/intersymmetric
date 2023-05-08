<script>
	// @ts-nocheck
	
	import { onMount } from 'svelte';
	import { CircularBuffer } from '$lib/common/queue';
	import { linearInterp, clip, mapRange } from '$lib/utility';
	
	export let data = [];
	export let config = {
		width: 200,
		height: 200,
		colour: 'darkblue',
		bgColour: 'yellow',
		maxWidth: '350px',
		maxHeight: '100px',
		min: 0.0,
		max: 1.0
	}

	let listening = false;
	let mounted = false;
	let wrapper;
	let buf = new CircularBuffer(2);
	let rect;
	let width = 0;
	let height = 0;
	let scrollX = 0;
	let scrollY = 0;
	
	function resize(entries) {
		rect = wrapper.getBoundingClientRect()
		width = rect.width;
		height = rect.height;
	}
	onMount(async() => {
		const sizeObserver = new ResizeObserver(resize).observe(wrapper);
		mounted = true;
		return () => { sizeObserver.unobserver(wrapper) }
	})
	
	function updatePoints() {
		if (buf.isFull()) {
			const canvasWidth = rect.right - rect.left;
			let a = buf.get(0)
			let b = buf.get(1)
			
			a.idx = clip(
			Math.floor((a.x / canvasWidth) * data.length),
			0, data.length-1
			)
			
			b.idx = clip(
			Math.floor((b.x / canvasWidth) * data.length),
			0, data.length-1
			)
			const numIntersects = Math.abs(a.idx - b.idx);
		
			if (numIntersects > 0) {
				const start = b.y / (rect.bottom - rect.top);
				const end = a.y / (rect.bottom - rect.top);

				const isRev = b.idx > a.idx;
				
				for (let i=0; i<numIntersects; i++) {
					const interp = i / numIntersects;
					
					let value = 0.0;
					if (isRev) {
						value = linearInterp(end, start, interp);
					} else{
						value = linearInterp(start, end, interp);
					}
					const clampedIndex = clip(
					Math.min(a.idx, b.idx)+i,
					0, data.length-1
					)
					data[clampedIndex] = mapRange(1-value, 0, 1, config.min, config.max);
				}
			} else {
				let value = (b.y / (rect.bottom - rect.top));
				data[b.idx] = mapRange(1-value, 0, 1, config.min, config.max);
			}
		}
	}

	function getPointer(clientX, clientY) {
		const maxWidth = rect.right - rect.left;
		const maxHeight = rect.bottom - rect.top;
		const x = clip((clientX + scrollX) - rect.left, 0, maxWidth);
		const y = clip((clientY + scrollY) - rect.top, 0, maxHeight);
		return [x, y]
	}
	
	function mouseMoveHandler(e) {
		if (listening) {
			const [x, y] = getPointer(e.clientX, e.clientY)
			buf.enqueue({ idx: 0, x:x, y:y })
			updatePoints()
		}
	}
	
	function touchMoveHandler(e) {
		if (listening) {
			const touchX = e.touches[0].clientX;
			const touchY = e.touches[0].clientY;
			const [x, y] = getPointer(touchX, touchY);
			buf.enqueue({ idx: 0, x:x, y:y })
			updatePoints()
		}
	}
</script>

<svelte:window 
on:mouseup={() => { listening = false; buf.clear() }} 
on:touchend={() => { listening = false; buf.clear() }}
on:touchmove={touchMoveHandler}
on:mousemove={mouseMoveHandler}
bind:scrollX={scrollX}
bind:scrollY={scrollY}
/>

<div class='wrapper' 
bind:this={wrapper} 
style:width={config.width}
style:height={config.height}
style:max-width={config.maxWidth} 
style:max-height={config.maxHeight}
>
	{#if mounted && width}
	<svg
	class='svg' 
	width='100%' 
	height='100%' 
	style:background-color={config.bgColour}
	on:mousedown={() => { listening = true }}
	on:touchstart={(e) => { buf.clear(); listening = true; }}
	>
	{#each data as d, i}
	<rect 
	class='bar'
	x={i * (width / data.length)}
	y={(1-d) * height}
	width={width / data.length}
	height={d * height}
	style:stroke={config.colour}
	style:fill={config.colour}
	/>
	{/each}
</svg>
{/if}
</div>

<style>
	.wrapper {
		touch-action: none;
	}
	
	.svg {
		touch-action: none;
	}
</style>