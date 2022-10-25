<script>
    import Play from '$lib/nyege/Play.svelte';
    import Knob from '$lib/common/Knob.svelte';
    import RadioH from '$lib/nyege/RadioH.svelte';
    import { sendDeviceMessage } from '@jamesb93/rnbo-svelte'
    import { socket, rate, globalCycle, hbp } from '$lib/nyege/app';

    export let patch;
    
    let playing = false;
    let w;

    const rateKnob = {
        min: 10,
        max: 240,
        step: 1,
        scale: 1,
        resetValue: 170
    };

    const radio = {
        options: [32, 24, 16, 12, 9, 8, 6, 4, 3, 2, 1, 0.5].map(x => ({ value: x, display: x })),
        height: '45px'
    };

    $: sendDeviceMessage(patch, 'rate', [$rate]);
    $: sendDeviceMessage(patch, 'state', [playing]);
    $: sendDeviceMessage(patch, 'global_cycle', [$globalCycle]);
</script>

<svelte:window bind:innerWidth={w} />

<div class="container">
    <div class="grid">
        <div class="text">
            {#if playing}
                pause
            {:else}
                play
            {/if}
        </div>
        <div class="text">rate</div>
    </div>
    <div class="grid row">
        <Play bind:state={playing} />
        <Knob {...rateKnob} bind:value={$rate} func={() => socket.emit('rate', $rate)} />
        <RadioH 
        {...radio} 
        bind:value={$globalCycle}
        width={w <= hbp ? '450px' : '600px'} 
        func={() => socket.emit('globalCycle', $globalCycle)} 
        />
    </div>
</div>

<style>
    .text {
        color: var(--primary);
    }
</style>
