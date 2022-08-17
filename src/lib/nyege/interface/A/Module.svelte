<script>
	import Row from './Row.svelte';
	import { 
		range0, range1, range2, range3, 
		buf0, buf1, buf2, buf3,
		pitch0, pitch1, pitch2, pitch3,
		len0, len1, len2, len3,
		div0, div1, div2, div3,

	} from '$lib/nyege/app';
	export let patch;
</script>

<div class="container">
	<Row bind:patch bind:div={$div0} bind:range={$range0} bind:buf={$buf0} bind:pitch={$pitch0} bind:len={$len0} />
	<Row bind:patch bind:div={$div1} bind:range={$range1} bind:buf={$buf1} bind:pitch={$pitch1} bind:len={$len1} />
	<Row bind:patch bind:div={$div2} bind:range={$range2} bind:buf={$buf2} bind:pitch={$pitch2} bind:len={$len2} />
	<Row bind:patch bind:div={$div3} bind:range={$range3} bind:buf={$buf3} bind:pitch={$pitch3} bind:len={$len3} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>