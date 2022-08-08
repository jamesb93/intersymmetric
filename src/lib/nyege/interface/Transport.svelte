<script>
	import Play from '$lib/nyege/Play.svelte';
	import Knob from '$lib/nyege/Knob.svelte';
	import { send_message } from '$lib/common/patch_helpers';
	import { rate } from '$lib/nyege/app';

	import Stepper from '$lib/nyege/Stepper.svelte';

	export let patch;

	let state = 0;
	let subdivision = 16;
	let range = 16;

	const rate_knob = {
		title: 'rate',
		min: 1,
		max: 300,
		step: 1,
		scale: 1,
		reset_value: 120,
		show_value: true
	};

	const stepper = {
		min: 1, max: 16, step: 1,
	}

	const subdiv_knob = {
		title: 'subdiv',
		min: 1, max: 16, step: 1,
		scale: 0.2, show_value: true
	}

	const param_knob = {
		title: 'length',
		min: 1, max: 1000, step: 0.1,
		scale: 1, show_value: true
	}

	const sound_knob = {
		title: 'sound',
		min: 0, max: 19, step: 1,
		scale: 1, show_value: true
	}

	$: send_message(patch, 'state', [state]);
	$: send_message(patch, 'rate', [$rate]);
	$: send_message(patch, 'polymetric_params', [0, range, subdivision]);

	let pos = 0;
	patch.messageEvent.subscribe(e => {
		if (e.tag === 'pips') {
			pos = e.payload[0]
		}
	})

	let length = 0.5;
	let sound = 0
	$: send_message(patch, 'test_param', [sound, 0, length])
</script>

<div class="container">
	<Play bind:state />
	<Knob {...rate_knob} bind:value={$rate} />
	<Knob {...subdiv_knob} bind:value={subdivision} />
	<Knob {...param_knob} bind:value={length} />
	<Knob {...sound_knob} bind:value={sound} />
	<Stepper 
	{ ...stepper }
	bind:subdivision
	bind:value={range}
	bind:pos
	/>
</div>
