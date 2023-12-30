<script>
    import Stepper from '$lib/nyege/Stepper.svelte';
    import Knob from '$lib/common/Knob.svelte';
    import Blip from '$lib/nyege/Blip.svelte';
    import { ref, set } from 'firebase/database';
    import { attach, room, db } from '$lib/nyege/app';
    import { sendDeviceMessage } from '@jamesb93/rnbo-svelte';
    import {
        buf0,
        buf1,
        buf2,
        buf3,
        pitch0,
        pitch1,
        pitch2,
        pitch3,
        len0,
        len1,
        len2,
        len3,
        div0,
        div1,
        div2,
        div3,
        range0,
        range1,
        range2,
        range3,
        pips,
        hbp
    } from '$lib/nyege/app';

    export let patch;

    let blips = new Array(4).fill(null);
    let w;

    const divKnob = { min: 1, max: 16, step: 1, scale: 0.1, resetValue: 1 };
    const stepper = {
        min: 1,
        max: 16,
        step: 1,
        height: 40
    };
    const soundKnob = { min: 0, max: 19, step: 1, scale: 0.15, resetValue: 0 };
    const pitchKnob = {
        min: -36,
        max: 36,
        step: 1,
        scale: 0.5,
        resetValue: 0
    };
    const lenKnob = {
        min: 0,
        max: 1,
        step: 0.01,
        scale: 0.005,
        resetValue: 1
    };

    patch.messageEvent.subscribe((e) => {
        if (e.tag === 'pips') {
            $pips = e.payload;
        }

        if (e.tag === 'blip') {
            if (e.payload <= 3) {
                blips[e.payload].blink();
            }
        }
    });

    $: sendDeviceMessage(patch, 'polymetric_params', [0, $range0, $div0]);
    $: sendDeviceMessage(patch, 'polymetric_params', [1, $range1, $div1]);
    $: sendDeviceMessage(patch, 'polymetric_params', [2, $range2, $div2]);
    $: sendDeviceMessage(patch, 'polymetric_params', [3, $range3, $div3]);
    $: sendDeviceMessage(patch, 'sampler_params', [0, $buf0, $pitch0, $len0]);
    $: sendDeviceMessage(patch, 'sampler_params', [1, $buf1, $pitch1, $len1]);
    $: sendDeviceMessage(patch, 'sampler_params', [2, $buf2, $pitch2, $len2]);
    $: sendDeviceMessage(patch, 'sampler_params', [3, $buf3, $pitch3, $len3]);

    $: attach($room, 'buf0', buf0, 0);
    $: attach($room, 'buf1', buf1, 0);
    $: attach($room, 'buf2', buf2, 0);
    $: attach($room, 'buf3', buf3, 0);

    $: attach($room, 'pitch0', pitch0, 0);
    $: attach($room, 'pitch1', pitch1, 0);
    $: attach($room, 'pitch2', pitch2, 0);
    $: attach($room, 'pitch3', pitch3, 0);

    $: attach($room, 'len0', len0, 1.0);
    $: attach($room, 'len1', len1, 1.0);
    $: attach($room, 'len2', len2, 1.0);
    $: attach($room, 'len3', len3, 1.0);

    $: attach($room, 'div0', div0, 16);
    $: attach($room, 'div1', div1, 6);
    $: attach($room, 'div2', div2, 3);
    $: attach($room, 'div3', div3, 3);

    $: attach($room, 'range0', range0, 16);
    $: attach($room, 'range1', range1, 14);
    $: attach($room, 'range2', range2, 8);
    $: attach($room, 'range3', range3, 16);
</script>

<svelte:window bind:innerWidth={w} />

<div class="container">
    <div class="labels grid">
        <div class="empty" />
        <div class="empty" />
        <div class="empty" />
        <div id="sound-label">sound</div>
        <div id="pitch-label">pitch</div>
        <div id="length-label">length</div>
    </div>

    <div class="row grid">
        <Blip bind:this={blips[0]} />
        <Knob
            {...divKnob}
            bind:value={$div0}
            func={() => set(ref(db, `/nnnb/${$room}/div0`), $div0)} />
        <Stepper
            {...stepper}
            bind:value={$range0}
            bind:div={$div0}
            width={w <= hbp ? 450 : 600}
            pos={$pips[0]}
            func={() => set(ref(db, `/nnnb/${$room}/range0`), $range0)} />
        <Knob
            {...soundKnob}
            bind:value={$buf0}
            func={() => set(ref(db, `/nnnb/${$room}/buf0`), $buf0)} />
        <Knob
            {...pitchKnob}
            bind:value={$pitch0}
            func={() => set(ref(db, `/nnnb/${$room}/pitch0`), $pitch0)} />
        <Knob
            {...lenKnob}
            bind:value={$len0}
            func={() => set(ref(db, `/nnnb/${$room}/len0`), $len0)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[1]} />
        <Knob
            {...divKnob}
            bind:value={$div1}
            func={() => set(ref(db, `/nnnb/${$room}/div1`), $div1)} />
        <Stepper
            {...stepper}
            bind:value={$range1}
            bind:div={$div1}
            width={w <= hbp ? 450 : 600}
            pos={$pips[1]}
            func={() => set(ref(db, `/nnnb/${$room}/range1`), $range1)} />
        <Knob
            {...soundKnob}
            bind:value={$buf1}
            func={() => set(ref(db, `/nnnb/${$room}/buf1`), $buf1)} />
        <Knob
            {...pitchKnob}
            bind:value={$pitch1}
            func={() => set(ref(db, `/nnnb/${$room}/pitch1`), $pitch1)} />
        <Knob
            {...lenKnob}
            bind:value={$len1}
            func={() => set(ref(db, `/nnnb/${$room}/len1`), $len1)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[2]} />
        <Knob
            {...divKnob}
            bind:value={$div2}
            func={() => set(ref(db, `/nnnb/${$room}/div2`), $div2)} />
        <Stepper
            {...stepper}
            bind:value={$range2}
            bind:div={$div2}
            width={w <= hbp ? 450 : 600}
            pos={$pips[2]}
            func={() => set(ref(db, `/nnnb/${$room}/range2`), $range2)} />
        <Knob
            {...soundKnob}
            bind:value={$buf2}
            func={() => set(ref(db, `/nnnb/${$room}/buf2`), $buf2)} />
        <Knob
            {...pitchKnob}
            bind:value={$pitch2}
            func={() => set(ref(db, `/nnnb/${$room}/pitch2`), $pitch2)} />
        <Knob
            {...lenKnob}
            bind:value={$len2}
            func={() => set(ref(db, `/nnnb/${$room}/len2`), $len2)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[3]} />
        <Knob
            {...divKnob}
            bind:value={$div3}
            func={() => set(ref(db, `/nnnb/${$room}/div3`), $div3)} />
        <Stepper
            {...stepper}
            bind:value={$range3}
            bind:div={$div3}
            pos={$pips[3]}
            width={w <= hbp ? 450 : 600}
            func={() => set(ref(db, `/nnnb/${$room}/range3`), $range3)} />
        <Knob
            {...soundKnob}
            bind:value={$buf3}
            func={() => set(ref(db, `/nnnb/${$room}/buf3`), $buf3)} />
        <Knob
            {...pitchKnob}
            bind:value={$pitch3}
            func={() => set(ref(db, `/nnnb/${$room}/pitch3`), $pitch3)} />
        <Knob
            {...lenKnob}
            bind:value={$len3}
            func={() => set(ref(db, `/nnnb/${$room}/len3`), $len3)} />
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .labels {
        margin-left: 578px;
        justify-content: center;
        color: var(--primary);
        margin: 0 auto;
    }

    .row {
        height: 50px;
    }
</style>
