<script>
	import Stepper from '$lib/nyege/Stepper.svelte';
	import Knob from '$lib/nyege/Knob.svelte';
	import { send_message } from '$lib/aaa/patch_helpers';

	export let patch;

	let range_a = 16,
		range_b = 16,
		range_c = 16,
		range_d = 16;

	let subdiv_a = 16,
		subdiv_b = 16,
		subdiv_c = 16,
		subdiv_d = 16;

	const stepper = {
		width: 500,
		height: 40,
		min: 1, max: 16, step: 1,
		thumb_width: 3
	}

	const knob = {
		title: 'subdivision',
		min: 1, max: 16, step: 1,
		scale: 0.1,
		reset_value: 16,
	};

	$: send_message(patch, 'range', [range_a, range_b, range_c, range_d])
	$: send_message(patch, 'subdiv', [subdiv_a, subdiv_b, subdiv_c, subdiv_d])
	$: send_message(patch, 'sound', [sound_])
</script>

<div class="container">

	<div class="row">
		<Knob {...knob} bind:value={subdiv_a} />
		<Stepper {...stepper} bind:subdivision={subdiv_a} bind:value={range_a}/>
	</div>
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
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
