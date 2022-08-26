<script>
	import { scale, clip } from '$lib/utility';

	export let value = 0; // value always comes in true
	export let min = 0,
		max = 2,
		step = 1;
	export let width = 400;
	export let height = 30;
	export let thumb_width = 1;
	export let active = false;
	export let display_value = null;
	export let div = 16;
	export let pos = 0;
	export let func = () => {};

	let thumb, fill, bar, rect;
	let down = false;
	let prev_touch = false;
	let prev_value = null;

	$: thumb_x = clip(scale(value, min, max, 0, width), 0, width) + thumb_width;

	const move = (e) => {
		rect = bar.getBoundingClientRect();
		if (down) {
			const x = e.pageX - rect.left;
			const ratio = x / width;
			let scaled = scale(ratio, 0, 1, min, max);
			value = Math.round((scaled - min) / step) * step + min;
			value = clip(value, min, max);
			if (prev_value !== value) {
				func();
			}
			prev_value = value;
		}
	};

	const handle_controldown = (e) => {
		down = true;
		move(e);
	};
	const handle_mouseup = () => {
		down = false;
	};
	const handle_touchend = () => {
		down = false;
	};
	const handle_mousemove = (e) => {
		move(e);
	};
	const handle_touchmove = (e) => {
		const touch = e.touches[0];
		if (prev_touch) {
			move(touch);
		}
		prev_touch = touch;
	};
</script>

<svelte:window
	on:mousemove={handle_mousemove}
	on:touchmove={handle_touchmove}
	on:mouseup={handle_mouseup}
	on:touchend={handle_touchend}
/>

<svg
	on:mousedown={handle_controldown}
	on:touchstart={handle_controldown}
	{width}
	{height}
	bind:this={bar}
	class:active
>
	<!-- Fill -->
	<!-- <rect class="step-fill" x="0" width={thumb_x} {height} /> -->
	<rect x={(thumb_x / div) * pos} class="pos" width={thumb_width} {height} />

	<!-- Step Pipss -->
	{#each Array(div) as _, i}
		<!-- <rect class="pip" x={(thumb_x / div) * i} width={thumb_width} {height} /> -->
		<line class='pip' 
		x1={(thumb_x / div) * i} 
		x2={(thumb_x / div) * i}
		y1=0
		y2={height}
		
		/>
	{/each}

	<text x={width - 50} y={height / 2 + 3}>
		{#if display_value !== null}
			{display_value}
		{:else}
			{value.toFixed(2)}
		{/if}
	</text>
</svg>

<style>
	svg {
		cursor: grab;
		touch-action: none;
		background-color: white;
		stroke-width: 1px;
		stroke: var(--primary);
		border: 1px solid var(--primary);
	}

	svg:active {
		cursor: grabbing;
	}

	text {
		font: var(--font);
		font-size: 10px;
		color: black;
		font-weight: 100;
	}

	.step-fill {
		fill: white;
	}

	.pip {
		stroke: var(--primary);
		stroke-width: 1px;
	}

	.pos {
		fill: var(--primary);
		stroke-width: 2px;
	}

	.active {
		background-color: var(--grey);
	}
</style>
