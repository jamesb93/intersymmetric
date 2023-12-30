<script>
    import RSlider from '$lib/nyege/RSlider.svelte';
    import RadioH from '$lib/nyege/RadioH.svelte';
    import RadioV from '$lib/nyege/RadioV.svelte';
    import Blip from '$lib/nyege/Blip.svelte';
    import Knob from '$lib/common/Knob.svelte';
    import { ref, set } from 'firebase/database';
    import { attach, room, db } from '$lib/nyege/app';
    import { sendDeviceMessage } from '@jamesb93/rnbo-svelte';
    import {
        buf6,
        scale,
        len6,
        chordfollow,
        chordspread,
        chordlow,
        chordhigh,
        hbp
    } from '$lib/nyege/app';

    export let patch;
    let w;

    const radioh = {
        options: [1, 2, 3, 4, 5, 6, 7, 8].map((x) => ({ display: x, value: x })),
        height: '50px',
        width: '450px'
    };
    const rslider = {
        min: 0,
        max: 100,
        step: 1,
        height: '30px'
    };
    const radiov = {
        options: [
            { value: 0, display: 'off' },
            { value: 1, display: 1 },
            { value: 2, display: 2 },
            { value: 3, display: 3 },
            { value: 4, display: 4 }
        ],
        height: '16.4px'
    };
    const soundKnob = {
        min: 20,
        max: 33,
        step: 1,
        scale: 0.25,
        resetValue: 20
    };
    const scaleKnob = {
        min: 0,
        max: 6,
        step: 1,
        scale: 0.05,
        resetValue: 0
    };
    const lenKnob = {
        min: 0,
        max: 1,
        step: 0.01,
        scale: 0.005,
        resetValue: 1
    };

    let blip;

    patch.messageEvent.subscribe((e) => {
        if (e.tag === 'blip' && e.payload === 6) {
            blip.blink();
        }
    });

    $: sendDeviceMessage(patch, 'chordfollow', [$chordfollow]);
    $: sendDeviceMessage(patch, 'chordscale', [
        $chordspread,
        $chordlow / 100.0,
        $chordhigh / 100.0,
        $scale
    ]);
    $: sendDeviceMessage(patch, 'chordsampler', [$buf6, $len6]);

    $: attach($room, 'buf6', buf6, 20);
    $: attach($room, 'scale', scale, 0);
    $: attach($room, 'len6', len6, 1);
    $: attach($room, 'chordfollow', chordfollow, 0);
    $: attach($room, 'chordspread', chordspread, 5);
    $: attach($room, 'chordlow', chordlow, 10);
    $: attach($room, 'chordhigh', chordhigh, 90);
</script>

<svelte:window bind:innerWidth={w} />

<div class="grid container">
    <Blip bind:this={blip} />
    <RadioV
        {...radiov}
        bind:value={$chordfollow}
        func={() => set(ref(db, `/nnnb/${$room}/chordfollow`), $chordfollow)} />
    <div class="centre">
        <RSlider
            {...rslider}
            bind:low={$chordlow}
            bind:high={$chordhigh}
            width={w <= hbp ? 448 : 598}
            lofunc={() => set(ref(db, `/nnnb/${$room}/chordlow`), $chordlow)}
            hifunc={() => set(ref(db, `/nnnb/${$room}/chordhigh`), $chordhigh)} />
        <RadioH
            {...radioh}
            bind:value={$chordspread}
            width={w <= hbp ? '450px' : '600px'}
            func={() => set(ref(db, `/nnnb/${$room}/chordspread`), $chordspread)} />
    </div>
    <div class="box">
        <div class="header">sound</div>
        <Knob
            {...soundKnob}
            bind:value={$buf6}
            func={() => set(ref(db, `/nnnb/${$room}/buf6`), $buf6)} />
    </div>
    <div class="box">
        <div class="header">scale</div>
        <Knob
            {...scaleKnob}
            bind:value={$scale}
            func={() => set(ref(db, `/nnnb/${$room}/scale`), $scale)} />
    </div>
    <div class="box">
        <div class="header">length</div>
        <Knob
            {...lenKnob}
            bind:value={$len6}
            func={() => set(ref(db, `/nnnb/${$room}/len6`), $len6)} />
    </div>
</div>

<style>
    .container {
        height: 94px;
    }
    .box {
        display: flex;
        flex-direction: column;
    }
    .header {
        color: var(--primary);
        width: 35px;
    }
</style>
