<script>
	import Play from '$lib/nyege/Play.svelte';
	import Knob from '$lib/nyege/Knob.svelte';
	import { send_message } from '$lib/aaa/patch_helpers';

	export let patch;

	let state = 0;

	$: send_message(patch, 'state', [state]);
</script>

<div class="container">
	<Play bind:state />
</div>
