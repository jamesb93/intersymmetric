<script>
    /** @type {import('@rnbo/js').Device} */
    export let device;

    import { sendDeviceMessage } from '../common/rnbo/helpers';
    import Knob from '$lib/common/Knob.svelte';
    import Toggle from '$lib/seq-2/Toggle.svelte';
    import Button from './Button.svelte';
    import Meter from './Meter.svelte';

    import { 
        state, 
        bpm,
        direction,
        multiplier,
        grid_end,
        grid_start,
        kick_level,
        metal_level,
        snare_level,
        fm_level
    } from '$lib/seq-2/app.js';

    const bpm_knob = {
        min: bpm.get().min,
        max: bpm.get().max,
        step: bpm.get().step,
        resetValue: bpm.init(),
        scale: 1,
        title: 'bpm'
    }
    const multiplier_knob = {
        min: 0,
        max: multiplier.get_options().length-1,
        step: 1,
        resetValue: 0,
        scale: 0.25,
        title: 'multiplier'
    }

    $: sendDeviceMessage(device, 'state', [$state])
    $: sendDeviceMessage(device, 'bpm', [$bpm])
    $: sendDeviceMessage(device, 'direction', [$direction])
    $: sendDeviceMessage(device, 'multiplier', [multiplier.get_value($multiplier)])
    $: sendDeviceMessage(device, 'grid_start', [$grid_start])
    $: sendDeviceMessage(device, 'grid_end', [$grid_end])
</script>

<div class="container">
    <Meter bind:level={$kick_level} />
    <Meter bind:level={$snare_level} />
    <Meter bind:level={$metal_level} />
    <Meter bind:level={$fm_level} />

    <Toggle bind:enabled={$state}/>
    <Button on:click={() => sendDeviceMessage(device, 'randomise', [0])}>
        rand
    </Button>
    
    <Knob { ...bpm_knob} bind:value={$bpm} />
    <Knob {...multiplier_knob} bind:value={$multiplier} displayValue={multiplier.get_value($multiplier)} />
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        gap: 2em;
        margin: 0 auto;
        margin-top: 2em;
    }
</style>
