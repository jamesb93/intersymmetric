<script>
	import RadioH from '$lib/nyege/RadioH.svelte';
	import Blip from '$lib/aaa/Blip.svelte';
	import Knob from '$lib/nyege/Knob.svelte';

	import { buf4, buf5, pitch4, pitch5, len4, len5 } from '$lib/nyege/app';

	const cycle = {
		options: ['off', 6, 4, 3, 2, 1],
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
</script>

<div class="container">
	<div class="row">
		<Blip />
		<div class='empty'></div> <!-- Vertical Radio -->
		<RadioH {...cycle}/>
		<Knob {...soundKnob} bind:value={$buf4} />
		<Knob {...pitchKnob} bind:value={$pitch4} />
		<Knob {...lenKnob} bind:value={$len4} />
	</div>
	<div class="row">
		<Blip />
		<div class='empty'></div> <!-- Vertical Radio -->
		<RadioH {...cycle}/>
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

