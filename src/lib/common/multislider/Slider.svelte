<script>
	export let mousedown = false;

	export let value;
	export let parentWidth;
	export let parentHeight;

	export let data;
	export let index;

	let hover = false;

	let x = index * (parentWidth / data.length);
	let width = parentWidth / data.length;

	let slider;

	const update = (e) => {
		const rect = slider.getBoundingClientRect();
		const y = e.pageY - rect.top - window.scrollY;
		const normPos = (y / parentHeight);
		data[index] = 1- normPos;
	}
</script>

<rect
	id='filler'
	x={x}
	y={parentHeight * (1-value)}
	width={width}
	height={(value) * parentHeight}
	class:hover={hover}
/>

<rect 
	bind:this={slider}
	id='container'
	x={x}
	y={0}
	width={width}
	height={parentHeight}
	on:mouseenter={e => {
		if (mousedown) {
			update(e);
		}
		hover = true;
	}}
	on:mouseleave={e => {
		if (mousedown) {
			update(e)
		}
		hover = false
	}}
	on:mousemove={e => {
		if (mousedown) {
			update(e);
		}
	}}
	on:mousedown={e => {
		update(e)
	}}
/>

<style>
	.hover {
		fill: rgb(53, 154, 149) !important;
	}
	#container {
		fill: transparent;
	}
	#filler {
		fill: green;
	}
</style>