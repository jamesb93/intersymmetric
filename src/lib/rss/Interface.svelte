<script>
	import MultiSlider from '$lib/common/multislider/MultiSlider.svelte';
	const length = 4;

	import { s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15 } from '$lib/rss/app';

	$: data = [
		[$s0, $s1, $s2, $s3],
		[$s4, $s5, $s6, $s7],
		[$s8, $s9, $s10, $s11],
		[$s12, $s13, $s14, $s15]
	]

	let view = 0;

	export let patch;
</script>

{#each data as d}
<div>
	{ d }
</div>	
{/each}

<!-- {#each data as d} -->
<MultiSlider 
	bind:data={data[0]}
	min={0}
	max={1.0}
	width={'200px'},
	height={'150px'},
	maxWidth={'200px'},
	maxHeight={'150px'},
	colour={'yellow'}
/>

<MultiSlider 
	bind:data={data[1]}
	min={0}
	max={1.0}
	width={'200px'},
	height={'150px'},
	maxWidth={'200px'},
	maxHeight={'150px'},
	colour={'yellow'}
/>
<!-- {/each} -->
