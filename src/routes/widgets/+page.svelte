<script>
	import Multislider from "$lib/common/multislider/Multislider.svelte"
	let height = 100
	let width = 400
	let data = Array.from(new Array(128), x => Math.random())

	let listening = false;
	let buf = new CircularBuffer(2);
	import { CanvasSpace, Create, Group, Rectangle } from 'pts';
	import { onMount } from 'svelte';
	import { clip } from '$lib/utility';
    import { CircularBuffer } from '../../lib/common/queue';
	import { linearInterp, scale } from '$lib/utility';
	let canvas;
	let rect;
	let space;
	let form;

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
					const r = Rectangle.fromTopLeft([left, x * space.height], barWidth,  space.height);
					form.fill("#FF5733", 3 ).rect( r );
				})
			},
			action: (t, x, y, event) => {
				if (t === 'move' && listening) {
					buf.enqueue(event);
					
					const canvasWidth = rect.right - rect.left;
					if (buf.isFull()) {
						// a is now, b is history
						const a = getMousePos(canvas, buf.get(0));
						const b = getMousePos(canvas, buf.get(1));
						a.idx = clip(
							Math.floor((a.x / canvasWidth) * data.length),
							0, data.length
						)

						b.idx = clip(
							Math.floor((b.x / canvasWidth) * data.length),
							0, data.length
						)
						const numIntersects = Math.abs(a.idx - b.idx);
						
						if (numIntersects > 0) {
							const start = b.y / (rect.bottom - rect.top);
							const end = a.y / (rect.bottom - rect.top);
							const isRev = b.idx > a.idx;
					
							for (let i=0; i < numIntersects; i++) {
								
								const interp = i / numIntersects;
								
								let value = 0.0;
								if (isRev) {
									value = linearInterp(end, start, interp);
								} else{
									value = linearInterp(start, end, interp);
								}
								data[Math.min(a.idx, b.idx)+i] = value;
								
							}
						} else {
							data[b.idx] = b.y / (rect.bottom - rect.top);
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
<canvas id='sketch' bind:this={canvas} on:mousedown={() => listening = true} />

<style>
	#sketch {
        width: 90%;
		max-width: 50%;
        height: 200px;
		max-height: 200px;
		border: 2px solid black;
    }
</style>