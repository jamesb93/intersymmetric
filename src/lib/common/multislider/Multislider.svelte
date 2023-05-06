<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { CircularBuffer } from '$lib/common/queue';
	import { CanvasSpace, Rectangle } from 'pts';
	import { linearInterp, clip } from '$lib/utility';
	export let data = [];
	export let width = 100
	export let height = 100
	export let colour = 'black'
	export let maxWidth = 100
	export let maxHeight = 100
	export let margin = 0
	export let scheme = null;

		// Define the color scheme
	// const colorScheme = d3.schemeCategory10;
	// const colorScheme = d3.interpolateSinebow()

	// Define the interpolator function
	// const interpolateColors = d3.interpolate(...colorScheme);

	
	let listening = false;
	let canvas;
	let rect;
	let space;
	let form;
	let buf = new CircularBuffer(2);
	
	function getMousePos(canvas, evt) {
		// We need to do this manually otherwise when shifting the window the resize is not accounted for.
		rect = canvas.getBoundingClientRect();
		return {
			x: (evt.clientX - rect.left),
			y: (evt.clientY - rect.top)
		}
	}
	
	onMount(async() => {
		rect = canvas.getBoundingClientRect();
		space = new CanvasSpace('#sketch')
		.setup({
			bgcolor: '#fff',
			resize: true,
		});
		form = space.getForm();
		
		space.add({
			animate: (time, ftime, space) => {
				const barWidth = space.width / data.length;
				data.forEach((x, i) => {
					const left = i * barWidth;
					const r = Rectangle.fromTopLeft(
						[left, space.height], 
						barWidth,  
						1-x * space.height
					);
					// const colour = interpolateColors(i / data.length);
					const colour = d3.interpolateSinebow(i / data.length)
					form.fill(colour, 1).rect( r );
				})
			},
			action: (t, x, y, event) => {
				if ((t === 'move' || t === 'out') && listening) {
					buf.enqueue(event);
					
					const canvasWidth = rect.right - rect.left;
					if (buf.isFull()) {
						// a is now, b is history
						const a = getMousePos(canvas, buf.get(0));
						const b = getMousePos(canvas, buf.get(1));
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
								data[clampedIndex] = 1-value;
								
							}
						} else {
							data[b.idx] = 1- (b.y / (rect.bottom - rect.top));
						}
					}
				} 
			}			
		});
		space.play().bindMouse();
	})
</script>

<svelte:window on:mouseup={() => { 
	listening = false 
	buf.clear();
}} />
<canvas 
id='sketch' 
bind:this={canvas} 
on:mousedown={() => listening = true} 
style:border-color={colour}
style:width={width}
style:max-width={maxWidth}
style:max-height={maxHeight}
style:height={height}
/>
	
<style>
	#sketch {
		border: 1px solid black;
		border-color: black;
	}
</style>