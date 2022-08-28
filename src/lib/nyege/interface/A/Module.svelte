<script>
    import Stepper from '$lib/nyege/Stepper.svelte';
    import Knob from '$lib/nyege/Knob.svelte';
    import Blip from '$lib/aaa/Blip.svelte';
    import RadioH from '$lib/nyege/RadioH.svelte';
    import { socket } from '$lib/nyege/app';
    import { send_message } from '$lib/common/patch_helpers';
    import {
        range0,
        range1,
        range2,
        range3,
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
        globalCycle,
        pips
    } from '$lib/nyege/app';

    export let patch;

    let blips = new Array(4).fill(null);

    const divKnob = { min: 1, max: 16, step: 1, scale: 0.25 };
    const stepper = {
        min: 1,
        max: 16,
        step: 1,
        width: '600',
        height: '40'
    };
    const soundKnob = { min: 0, max: 33, step: 1, scale: 0.25 };
    const pitchKnob = {
        min: -36,
        max: 36,
        step: 1,
        scale: 0.5
    };
    const lenKnob = {
        min: 0,
        max: 1,
        step: 0.01,
        scale: 0.005
    };

    const radio = {
        options: [32, 24, 16, 12, 9, 8, 6, 4, 3, 2, 1, 0.5].map(x => ({ value: x, display: x })),
        width: '54.54px',
        height: '20px'
    };

    patch.messageEvent.subscribe(e => {
        if (e.tag === 'pips') {
            $pips = e.payload;
        }

        if (e.tag === 'blip') {
            if (e.payload <= 3) {
                blips[e.payload].blink();
            }
        }
    });

    $: send_message(patch, 'global_cycle', [$globalCycle]);
    $: send_message(patch, 'polymetric_params', [0, $range0, $div0]);
    $: send_message(patch, 'polymetric_params', [1, $range1, $div1]);
    $: send_message(patch, 'polymetric_params', [2, $range2, $div2]);
    $: send_message(patch, 'polymetric_params', [3, $range3, $div3]);
    $: send_message(patch, 'sampler_params', [0, $buf0, $pitch0, $len0]);
    $: send_message(patch, 'sampler_params', [1, $buf1, $pitch1, $len1]);
    $: send_message(patch, 'sampler_params', [2, $buf2, $pitch2, $len2]);
    $: send_message(patch, 'sampler_params', [3, $buf3, $pitch3, $len3]);
    $: send_message(patch, 'global_cycle', [$globalCycle]);
</script>

<div class="container">
    <div class="radio-row">
        <RadioH {...radio} bind:value={$globalCycle} func={() => socket.emit('globalCycle', $globalCycle)} />
        <div class="knob-labels">
            <div>sound</div>
            <div>pitch</div>
            <div>length</div>
        </div>
    </div>

    <div class="row grid">
        <Blip bind:this={blips[0]} />
        <Knob {...divKnob} bind:value={$div0} func={() => socket.emit('div0', $div0)} />
        <Stepper {...stepper} bind:value={$range0} bind:div={$div0} pos={$pips[0]} func={() => socket.emit('range0', $range0)} />
        <Knob {...soundKnob} bind:value={$buf0} func={() => socket.emit('buf0', $buf0)} />
        <Knob {...pitchKnob} bind:value={$pitch0} func={() => socket.emit('pitch0', $pitch0)} />
        <Knob {...lenKnob} bind:value={$len0} func={() => socket.emit('len0', $len0)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[1]} />
        <Knob {...divKnob} bind:value={$div1} func={() => socket.emit('div1', $div1)} />
        <Stepper {...stepper} bind:value={$range1} bind:div={$div1} pos={$pips[1]} func={() => socket.emit('range1', $range1)} />
        <Knob {...soundKnob} bind:value={$buf1} func={() => socket.emit('buf1', $buf1)} />
        <Knob {...pitchKnob} bind:value={$pitch1} func={() => socket.emit('pitch1', $pitch1)} />
        <Knob {...lenKnob} bind:value={$len1} func={() => socket.emit('len1', $len1)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[2]} />
        <Knob {...divKnob} bind:value={$div2} func={() => socket.emit('div2', $div2)} />
        <Stepper {...stepper} bind:value={$range2} bind:div={$div2} pos={$pips[2]} func={() => socket.emit('range2', $range2)}/>
        <Knob {...soundKnob} bind:value={$buf2} func={() => socket.emit('buf2', $buf2)} />
        <Knob {...pitchKnob} bind:value={$pitch2} func={() => socket.emit('pitch2', $pitch2)} />
        <Knob {...lenKnob} bind:value={$len2} func={() => socket.emit('len2', $len2)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[3]} />
        <Knob {...divKnob} bind:value={$div3} func={() => socket.emit('div3', $div3)} />
        <Stepper {...stepper} bind:value={$range3} bind:div={$div3} pos={$pips[3]} func={() => socket.emit('range3', $range3)} />
        <Knob {...soundKnob} bind:value={$buf3} func={() => socket.emit('buf3', $buf3)} />
        <Knob {...pitchKnob} bind:value={$pitch3} func={() => socket.emit('pitch3', $pitch3)} />
        <Knob {...lenKnob} bind:value={$len3} func={() => socket.emit('len3', $len3)} />
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }
    .radio-row {
        display: grid;
        grid-template-columns: 600px 150px;
        justify-content: center;
        margin-left: 80px;
    }

    .knob-labels {
        display: grid;
        grid-template-columns: repeat(3, 50px);
        justify-content: space-around;
        color: var(--primary);
    }

    .row {
        height: 55px;
    }
</style>
