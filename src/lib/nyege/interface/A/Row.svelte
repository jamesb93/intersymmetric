<script>
	import Stepper from '$lib/nyege/Stepper.svelte';
	import Knob from '$lib/nyege/Knob.svelte';
	import Blip from '$lib/aaa/Blip.svelte';

	export let patch;
	export let div;
	export let range;
	export let buf;
	export let pitch;
	export let len;

	const divKnob = {
		min: 1, max: 16, step: 1, scale: 0.25
	}
	const stepper = {
		min: 1, max: 16, step: 1,
		width: '600', height: '40'
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

<div class="row">
	<Blip />
	<Knob {...divKnob} bind:value={div} />
	<Stepper {...stepper} bind:value={range} bind:div={div} />
	<Knob {...soundKnob} bind:value={buf} />
	<Knob {...pitchKnob} bind:value={pitch} />
	<Knob {...lenKnob} bind:value={len} />
</div>

<style>
	.row {
		display: grid;
		align-items: center;
		justify-content: center;
		grid-template-columns: var(--grid);
		height: 55px;
	}
</style>

