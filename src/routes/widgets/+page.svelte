<script>
	import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';
	const length = 200;
	let data = Array.from({ length }, () => Math.random());

</script>

<MultiSlider 
bind:data={data}
	width='400px'
	maxWidth='50%'
	height='150px'
	maxHeight='150px'
	colour='darkblue'
	margin=100
/>