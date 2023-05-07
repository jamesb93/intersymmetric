<script>
	import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';
	const length = 4;
	let data = Array.from({ length }, () => Math.random() * 2 - 1);

</script>

<MultiSlider 
	bind:data={data}
	min={-1.0}
	max={1.0}
	width={'200px'},
	height={'150px'},
	maxWidth={'200px'},
	maxHeight={'150px'},
	colour={'yellow'}
/>