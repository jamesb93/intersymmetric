<script>
	import MultiSlider from '$lib/common/MultiSlider.svelte';
	export let patch;
	let data = [0.0, 0.5, 1.0]
</script>

<MultiSlider 
	bind:data={data}
/>

