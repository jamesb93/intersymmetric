<script>
	import RadioH from '$lib/nyege/RadioH.svelte';
	import RadioV from '$lib/nyege/RadioV.svelte';
	import Blip from '$lib/aaa/Blip.svelte';
	import Knob from '$lib/nyege/Knob.svelte';

	import { buf6, scale, len6} from '$lib/nyege/app';

	const radioh = {
		options: [1, 2, 3, 4, 5, 6, 7, 8],
		width: '75px'
	}
	const radiov = {
		options: [1, 2, 3, 4, 'off']
	}
	const soundKnob = {
		showValue: true,
		min: 0, max: 33, step: 1, scale: 0.25
	}
	const scaleKnob = {
		showValue: true,
		min: 0, max: 6, step: 1, scale: 0.5
	}
	const lenKnob = {
		showValue: true,
		min: 0, max: 1, step: 0.01, scale: 0.005
	}
</script>

<div class="container">
	<div class="row">
		<Blip />
		<RadioV />
		<RadioH {...radioh} />
		<Knob {...soundKnob} bind:value={$buf6} />
		<Knob {...scaleKnob} bind:value={$scale} />
		<Knob {...lenKnob} bind:value={$len6} />
	</div>
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: 30px 70px 600px 70px 70px 70px;
		align-items: center;
		justify-content: center;
		height: 55px;
	}
</style>


