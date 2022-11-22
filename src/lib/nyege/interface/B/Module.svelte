<script>
    import RadioH from '$lib/nyege/RadioH.svelte';
    import RadioV from '$lib/nyege/RadioV.svelte';
    import Blip from '$lib/nyege/Blip.svelte';
    import Knob from '$lib/common/Knob.svelte';
    import { ref, set } from 'firebase/database';
    import { attach, room, db } from '$lib/nyege/app';
    import { sendDeviceMessage } from '@jamesb93/rnbo-svelte'
    import { 
        buf4, buf5, 
        pitch4, pitch5, 
        len4, len5, 
        retrig0, retrig1, 
        retrigGate0, retrigGate1, 
        hbp 
    } from '$lib/nyege/app';

    export let patch;

    const cycle = {
        options: [
            { value: 32, display: 32 },
            { value: 6, display: 6 },
            { value: 4, display: 4 },
            { value: 3, display: 3 },
            { value: 2, display: 2 },
            { value: 1, display: 1 },
            { value: 0.5, display: 0.5 },
            { value: 0.25, display: 0.25 }
        ],
        height: '50px'
    };
    const soundKnob = { min: 0, max: 19, step: 1, scale: 0.15, resetValue: 0 };
    const pitchKnob = { min: -36, max: 36, step: 1, scale: 0.5, resetValue: 0 };
    const lenKnob = { min: 0, max: 1, step: 0.01, scale: 0.005, resetValue: 1 };
    const tog = {
        options: [
            { value: 0, display: 'off ' },
            { value: 1, display: 'on' }
        ],
        height: '24px'
    };

    let blip0, blip1, w;

    patch.messageEvent.subscribe(e => {
        if (e.tag === 'blip') {
            if (e.payload === 4) {
                blip0.blink();
            } else if (e.payload === 5) {
                blip1.blink();
            }
        }
    });

    $: sendDeviceMessage(patch, 'retrigger_params', [0, $retrigGate0, $retrig0]);
    $: sendDeviceMessage(patch, 'retrigger_params', [1, $retrigGate1, $retrig1]);
    $: sendDeviceMessage(patch, 'sampler_params', [4, $buf4, $pitch4, $len4]);
    $: sendDeviceMessage(patch, 'sampler_params', [5, $buf5, $pitch5, $len5]);
    
    $: attach($room, 'buf4', buf4, 0);
    $: attach($room, 'buf5', buf5, 0);
    $: attach($room, 'pitch4', pitch4, 0);
    $: attach($room, 'pitch5', pitch5, 0);
    $: attach($room, 'len4', len4, 1);
    $: attach($room, 'len5', len5, 1);
    $: attach($room, 'retrig0', retrig0, 6);
    $: attach($room, 'retrig1', retrig1, 6);
    $: attach($room, 'retrigGate0', retrigGate0, 0);
    $: attach($room, 'retrigGate1', retrigGate1, 0);
</script>

<svelte:window bind:innerWidth={w} />

<div class="container">
    <div class="row grid">
        <Blip bind:this={blip0} />
        <RadioV {...tog} bind:value={$retrigGate0} func={ () => set(ref(db, `/nnnb/${$room}/retrigGate0`), $retrigGate0) } />
        <RadioH {...cycle} bind:value={$retrig0} width={w <= hbp ? '450px' : '600px'} func={ () => set(ref(db, `/nnnb/${$room}/retrig0`), $retrig0) } />
        <Knob {...soundKnob} bind:value={$buf4} func={ () => set(ref(db, `/nnnb/${$room}/buf4`), $buf4) } />
        <Knob {...pitchKnob} bind:value={$pitch4} func={ () => set(ref(db, `/nnnb/${$room}/pitch4`), $pitch4) } />
        <Knob {...lenKnob} bind:value={$len4} func={ () => set(ref(db, `/nnnb/${$room}/len4`), $len4) } />
    </div>
    <div class="row grid">
        <Blip bind:this={blip1} />
        <RadioV {...tog} bind:value={$retrigGate1} func={ () => set(ref(db, `/nnnb/${$room}/retrigGate1`), $retrigGate1) } />
        <RadioH {...cycle} bind:value={$retrig1} width={w <= hbp ? '450px' : '600px'} func={ () => set(ref(db, `/nnnb/${$room}/retrig1`), $retrig1) } />
        <Knob {...soundKnob} bind:value={$buf5} func={ () => set(ref(db, `/nnnb/${$room}/buf5`), $buf5) } />
        <Knob {...pitchKnob} bind:value={$pitch5} func={ () => set(ref(db, `/nnnb/${$room}/pitch5`), $pitch5) } />
        <Knob {...lenKnob} bind:value={$len5} func={ () => set(ref(db, `/nnnb/${$room}/len5`), $len5) } />
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }
    .row {
        height: 55px;
    }
</style>
