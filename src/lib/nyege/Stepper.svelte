<script>
	import { scale, clip } from '$lib/utility';

	export let value = 0; // value always comes in true
	export let min = 0,
		max = 2,
		step = 1;
	export let width = 40;
	export let height = 200;
	export let thumb_width = 2;
	export let active = false;
	export let func = () => {};
	export let display_value = null;
	export let subdivision = 16;
	export let pos = 0;

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
	<!-- <rect class='thumb' x={thumb_x} bind:this={thumb} width={thumb_width} height={height} /> -->
	<!-- Fill -->
	<rect class="step-fill" x="0" width={thumb_x} {height} />
	<rect x={(thumb_x / subdivision) * pos} class="pos" width={thumb_width} {height} />

	<!-- Step Pipss -->
	{#each Array(subdivision) as _, i}
		<rect class="pip" x={(thumb_x / subdivision) * i} width={thumb_width} {height} />
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
		touch-action: none;
		background-color: white;
		stroke-width: 1px;
		stroke: black;
		outline: 1px solid rgb(136, 136, 136);
	}

	text {
		font: var(--font);
		font-size: 10px;
		color: black;
		font-weight: 100;
	}

	.step-fill {
		fill: rgba(0.2, 0.9, 0, 0.2);
		stroke: rgba(0.2 0.9, 0, 0.2);
	}

	.pip {
		fill: rgba(24, 126, 24, 0.2);
	}

	.pos {
		fill: rgba(186, 99, 18, 0.8);
	}

	.active {
		background-color: var(--grey);
	}
</style>
