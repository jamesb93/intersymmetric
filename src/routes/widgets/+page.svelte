<script>
	import Multislider from '$lib/common/multislider/Multislider.svelte';
	const length = 10;
	let data = Array.from({ length }, () => Math.random());

</script>

<Multislider 
bind:data={data}
	width='400px'
	maxWidth='50%'
	height='150px'
	maxHeight='150px'
	colour='darkblue'
	margin=100
/>