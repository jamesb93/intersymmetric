<script>
    import Play from '$lib/nyege/Play.svelte';
    import Knob from '$lib/nyege/Knob.svelte';
    import RadioH from '$lib/nyege/RadioH.svelte';
    import { sendMessage } from '$lib/common/patch_helpers';
    import { socket, rate, globalCycle } from '$lib/nyege/app';

    export let patch;
    let playing = false;

    const rateKnob = {
        min: 0,
        max: 1,
        step: 0.01,
        scale: 0.01,
        resetValue: 0.5,
        show_value: true
    };

    const radio = {
        options: [32, 24, 16, 12, 9, 8, 6, 4, 3, 2, 1, 0.5].map(x => ({ value: x, display: x })),
        width: '54.54px',
        height: '50px'
    };

    $: sendMessage(patch, 'rate', [$rate]);
    $: sendMessage(patch, 'state', [playing]);
    $: sendMessage(patch, 'global_cycle', [$globalCycle]);
</script>

<div class="container">
    <div class="grid">
        <div class="">
        {#if playing}
        pause
        {:else}
        play
        {/if}
        </div>
        <div>rate</div>
    </div>
    <div class="grid row">
        <Play bind:state={playing} />
        <Knob {...rateKnob} bind:value={$rate} func={() => socket.emit('rate', $rate)} />
        <RadioH {...radio} bind:value={$globalCycle} func={() => socket.emit('globalCycle', $globalCycle)} />
    </div>
</div>

<style>
    .container {

    }
</style>
