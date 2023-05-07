<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { CircularBuffer } from '$lib/common/queue';
	import { CanvasSpace, Rectangle, CanvasForm } from 'pts';
	import { linearInterp, clip, mapRange, scale } from '$lib/utility';
	
	
	/** @type {Array<number>} */
	export let data = [];
	/** @type {string} */
	export let width = '100px'
	/** @type {string} */
	export let height = '100px'
	/** @type {string} */
	export let colour = 'black'
	/** @type {string} */
	export let maxWidth = '100px'
	/** @type {string} */
	export let maxHeight = '100px'
	/** @type {number} */
	export let min = 0.0;
	/** @type {number} */
	export let max = 1.0;
	/** @type {boolean} */
	let listening = false;
	
	/** @type {HTMLCanvasElement} */
	let canvas;
	/** @type {DOMRect} */
	let rect;
	let space;
	/** @type {CanvasForm} */
	let form;

	let buf = new CircularBuffer(2);
	
	/**
	 * We need to do this manually otherwise when shifting the window the resize is not accounted for. 
	 * @param {HTMLCanvasElement} canvas
	 * @param {MouseEvent} evt
	 * @returns {Object}
	*/
	function getMousePos(canvas, evt) {
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
					const normalisedX = mapRange(x, min, max, 0.0, 1.0)
					const left = i * barWidth;
					const r = Rectangle.fromTopLeft(
						[left, space.height], 
						barWidth,  
						1-normalisedX * space.height
					);
					// const colour = interpolateColors(i / data.length);
					const colour = d3.interpolateSinebow(i / data.length)
					form.fill(colour, 1).rect( r );
				})
			},
			action: (t, x, y, event) => {
				console.log(t)
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
								data[clampedIndex] = mapRange(1-value, 0, 1, min, max);
								
							}
						} else {
							let value = (b.y / (rect.bottom - rect.top));
							let denorm = scale(1-value, 0, 1, min, max);
							data[b.idx] = denorm;
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