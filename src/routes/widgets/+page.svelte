<script>
	import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';
	const length = 10;
	let data = Array.from({ length }, () => Math.random() * 2 - 1);

</script>

<MultiSlider 
bind:data={data}
	width='400px'
	maxWidth='50%'
	height='150px'
	maxHeight='150px'
	colour='darkblue'
	min={-1.0}
	max={1.0}
/>