<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import { CircularBuffer } from '$lib/common/queue';
	import { CanvasSpace, Rectangle, CanvasForm, Pt } from 'pts';
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
			// resize: true,
		});
		form = space.getForm();
		
		space.add({
			animate: (time, ftime, space) => {
				if (buf.isFull()) {
					const canvasWidth = rect.right - rect.left;
					// a is now, b is history
					// TODO: make this code more readable instead of making it work
					let pta = buf.get(0)
					let ptb = buf.get(1)
					let a = { idx:0, x:0, y:0 }
					let b = { idx:0, x:0, y:0 }
					a.x = pta[0]
					b.x = ptb[0]
					a.y = pta[1]
					b.y = ptb[1]
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


				const barWidth = space.width / data.length;
				data.forEach((x, i) => {
					const normalisedX = mapRange(x, min, max, 0.0, 1.0)
					const left = i * barWidth;
					const r = Rectangle.fromTopLeft(
						[left, space.height], 
						barWidth,  
						1-normalisedX * space.height
					);
					form.fillOnly(colour).rect( r );
				})
			}	
		});
		space.play().bindMouse();
	})

	function getPointer(clientX, clientY) {
		const rect = canvas.getBoundingClientRect();
		const maxWidth = rect.right - rect.left;
		const maxHeight = rect.bottom - rect.top;

		const x = clip(clientX - rect.left, 0, maxWidth);
		const y = clip(clientY - rect.top, 0, maxHeight);

		return [x, y]
	}

	function mouseMove(e) {
		if (listening) {
			const pt = getPointer(e.clientX, e.clientY)
			buf.enqueue(new Pt(pt))
		}
	}

	function touchMoveHandler(e) {
		if (listening) {
			const x = e.touches[0].clientX;
			const y = e.touches[0].clientY;
			const pt = getPointer(x, y);
			buf.enqueue(new Pt(pt));
		}
	}
</script>

<svelte:window 
on:mousedown={() => { buf.clear() }}
on:mouseup={() => { listening = false }} 
on:mousemove={mouseMove}
on:touchstart={() => { listening = true }}
on:touchend={() => { listening = true; buf.clear() }}
on:touchmove={touchMoveHandler}
/>

<canvas 
	id='sketch' 
	bind:this={canvas} 
	on:mousedown={() => listening = true} 
	style:border-color={colour}
	style:max-width={maxWidth}
	style:max-height={maxHeight}
/>
	
<style>
	#sketch {
		touch-action: none;
	}
</style>