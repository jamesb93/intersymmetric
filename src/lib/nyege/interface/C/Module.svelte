<script>
	import RSlider from '$lib/nyege/RSlider.svelte';
	import RadioH from '$lib/nyege/RadioH.svelte';
	import RadioV from '$lib/nyege/RadioV.svelte';
	import Blip from '$lib/aaa/Blip.svelte';
	import Knob from '$lib/nyege/Knob.svelte';

	export let patch;

	import { buf6, scale, len6, rslidermin, rslidermax } from '$lib/nyege/app';

	const radioh = {
		options: [1, 2, 3, 4, 5, 6, 7, 8].map((x) => ({ display: x, value: x })),
		width: '75px'
	};
	const radiov = {
		options: [
			{ value: 1, display: 1 },
			{ value: 2, display: 2 },
			{ value: 3, display: 3 },
			{ value: 4, display: 4 },
			{ value: 0, display: 'off' }
		]
	};
	const rslider = { min: 1, max: 8, step: 1 };
	const soundKnob = {
		showValue: true,
		min: 0,
		max: 33,
		step: 1,
		scale: 0.25
	};
	const scaleKnob = {
		showValue: true,
		min: 0,
		max: 6,
		step: 1,
		scale: 0.5
	};
	const lenKnob = {
		showValue: true,
		min: 0,
		max: 1,
		step: 0.01,
		scale: 0.005
	};
</script>

<div class="container">
	<div class="row">
		<Blip />
		<RadioV {...radiov} />
		<div class="centre">
			<RSlider {...rslider} bind:low={$rslidermin} bind:high={$rslidermax} />
			<RadioH {...radioh} />
		</div>
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
