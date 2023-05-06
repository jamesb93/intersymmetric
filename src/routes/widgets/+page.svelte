<script>
	import Multislider from "$lib/common/multislider/Multislider.svelte"
	let height = 100
	let width = 400
	let data = Array.from(new Array(4), x => Math.random())

	let listening = false;
	import { CanvasSpace, Create, Group, Rectangle } from 'pts';
	import { onMount } from 'svelte';
	import { clip } from '$lib/utility';
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
			action: (t, x, y, e) => {
				if (t === 'drag' && listening) {
					const mouse = getMousePos(canvas, e);
					const canvasWidth = rect.right - rect.left;
					const idx = clip(
						Math.floor((mouse.x / canvasWidth) * data.length),
						0,
						data.length
					)
					data[idx] = mouse.y / (rect.bottom - rect.top);
				}
			}			
		});
        space.play().bindMouse();
	})
</script>
<svelte:window on:mouseup={() => listening = false} />
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