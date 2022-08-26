<script>
	import RadioH from '$lib/nyege/RadioH.svelte';
	import Blip from '$lib/aaa/Blip.svelte';
	import Knob from '$lib/nyege/Knob.svelte';
	import { send_message } from '$lib/common/patch_helpers';

	import { 
		buf4, buf5, 
		pitch4, pitch5, 
		len4, len5,
		retrig1, retrig2
	} from '$lib/nyege/app';

	export let patch;

	const cycle = {
		options: [
			{ value: 0, display: 'off'},
			{ value: 6, display: 6 },
			{ value: 4, display: 4 },
			{ value: 3, display: 3 },
			{ value: 2, display: 2 },
			{ value: 1, display: 1 }
		],
		width: '100px'
	}
	const soundKnob = {
		showValue: true,
		min: 0, max: 33, step: 1, scale: 0.25
	}
	const pitchKnob = {
		showValue: true,
		min: -36, max: 36, step: 1, scale: 0.5
	}
	const lenKnob = {
		showValue: true,
		min: 0, max: 1, step: 0.01, scale: 0.005
	}


	$: send_message(patch, 'retrigger_params', [0])
</script>

<div class="container">
	<div class="row">
		<Blip />
		<div class='empty'></div> <!-- Vertical Radio -->
		<RadioH {...cycle} bind:value={$retrig1}/>
		<Knob {...soundKnob} bind:value={$buf4} />
		<Knob {...pitchKnob} bind:value={$pitch4} />
		<Knob {...lenKnob} bind:value={$len4} />
	</div>
	<div class="row">
		<Blip />
		<div class='empty'></div> <!-- Vertical Radio -->
		<RadioH {...cycle} bind:value={$retrig2} />
		<Knob {...soundKnob} bind:value={$buf5} />
		<Knob {...pitchKnob} bind:value={$pitch5} />
		<Knob {...lenKnob} bind:value={$len5} />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
	.row{
		display: grid;
		grid-template-columns: var(--grid);
		align-items: center;
		justify-content: center;
		height: 55px;
	}
	.empty {
		width: 100%;
	}

</style>

