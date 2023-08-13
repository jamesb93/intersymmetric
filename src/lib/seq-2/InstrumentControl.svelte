<script lang='ts'>
    import HMeter from './HMeter.svelte';
    import VMeter from './VMeter.svelte';
    import Knob from '$lib/seq-2/Knob.svelte';
	export let instrument;
	const { sound, pitch, shape, level } = instrument;

	const sound_knob = {
		min: sound.get().min,
		max: sound.get().max,
		step: sound.get().step,
		resetValue: sound.init(),
		scale: 0.01,
		title: 'Sound',
		padding: 20
	}

	const pitch_knob = {
		min: pitch.get().min,
		max: pitch.get().max,
		step: pitch.get().step,
		resetValue: pitch.init(),
		scale: 0.5,
		title: 'Pitch',
		padding: 20,
	}

	const shape_knob = {
		min: shape.get().min,
		max: shape.get().max,
		step: shape.get().step,
		resetValue: shape.init(),
		scale: 0.01,
		title: 'Shape',
		padding: 20,
	}
	let containerHeight = 0;
	let containerWidth = 0;
</script>

<div class='container'>
	<div>{instrument.name}</div>
	<div class="widgets">
		<div class="knobs">
			<Knob {...sound_knob} bind:value={$sound}/>
			<Knob {...pitch_knob} bind:value={$pitch}/>
			<Knob {...shape_knob} bind:value={$shape}/>
		</div>
		<HMeter bind:level={$level} height={16}/>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--primary);
		padding: 0.5em;
		height: max-content;
		width: max-content;
	}
	.widgets {
		display: grid;
		grid-template-rows: auto auto;
		gap: 1em;
		place-items: center;
	}
	.knobs {
		display: grid;
		grid-template-columns: auto auto auto;
		gap: 0.25em;
	}
</style>