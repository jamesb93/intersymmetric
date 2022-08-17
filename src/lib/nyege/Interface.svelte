<script>
	import Transport from '$lib/nyege/interface/Transport.svelte';
	import A from '$lib/nyege/interface/A.svelte';
	import B from '$lib/nyege/interface/B.svelte';
	import C from '$lib/nyege/interface/C.svelte';

	export let patch;
</script>

<Transport bind:patch />

<!-- <A bind:patch />
<B bind:patch />
<C bind:patch /> -->
<style>
	.container {
		display: grid;
		justify-content: center;
		margin: 0 auto;
		margin-top: 2em;
	}

	@media only screen and (min-width: 1005px) {
		.container {
			grid-template-columns: repeat(3, auto);
		}
	}

	@media only screen and (max-width: 1005px) {
		.container {
			grid-template-rows: repeat(3, auto);
		}
	}
</style>
