<script>
	import Multislider from "$lib/common/multislider/Multislider.svelte"
	let height = 100
	let width = 400

	// setInterval(() => {
	// 	height = (Math.random() * 50) + 100
	// 	width = (Math.random() * 300) + 100
	// }, 1000)

	let data = Array.from(new Array(12), x => Math.random())
	// let data = [0.1, 0.2, 0.3, 0.4]
</script>

<h1>Widgets</h1>

<div class="">
	{ data }
</div>

<Multislider 
width={width}
height={height}
bind:data={data}
/>