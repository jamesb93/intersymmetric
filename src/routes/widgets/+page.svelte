<script>
	import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';
	const length = 200;
	let data = Array.from({ length }, () => Math.random() * 2 - 1);

</script>

<div>
	<MultiSlider 
	bind:data={data}
	min={-1.0}
	max={1.0}
	width={'200px'},
	height={'150px'},
	maxWidth={'200px'},
	maxHeight={'150px'},
	colour={'darkBlue'}
	/>
</div>

<style>
	div {
		max-width: 400px;
		max-height: 100px;
	}
</style>