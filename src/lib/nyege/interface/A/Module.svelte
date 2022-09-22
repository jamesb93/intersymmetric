<script>
    import Stepper from '$lib/nyege/Stepper.svelte';
    import Knob from '$lib/common/Knob.svelte';
    import Blip from '$lib/nyege/Blip.svelte';
    import { socket } from '$lib/nyege/app';
    import { sendMessage } from '$lib/common/patch-helpers';
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
        pips
    } from '$lib/nyege/app';

    export let patch;

    let blips = new Array(4).fill(null);

    const divKnob = { min: 1, max: 16, step: 1, scale: 0.1, resetValue: 1 };
    const stepper = {
        min: 1,
        max: 16,
        step: 1,
        width: 450,
        height: 35
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

    $: sendMessage(patch, 'polymetric_params', [0, $range0, $div0]);
    $: sendMessage(patch, 'polymetric_params', [1, $range1, $div1]);
    $: sendMessage(patch, 'polymetric_params', [2, $range2, $div2]);
    $: sendMessage(patch, 'polymetric_params', [3, $range3, $div3]);
    $: sendMessage(patch, 'sampler_params', [0, $buf0, $pitch0, $len0]);
    $: sendMessage(patch, 'sampler_params', [1, $buf1, $pitch1, $len1]);
    $: sendMessage(patch, 'sampler_params', [2, $buf2, $pitch2, $len2]);
    $: sendMessage(patch, 'sampler_params', [3, $buf3, $pitch3, $len3]);
</script>

<div class="container">
    <div class="labels grid">
        <div class='empty'></div>
        <div class='empty'></div>
        <div class='empty'></div>
        <div id="sound-label">sound</div>
        <div id="pitch-label">pitch</div>
        <div id="length-label">length</div>
    </div>

    <div class="row grid">
        <Blip bind:this={blips[0]} />
        <Knob {...divKnob} bind:value={$div0} func={() => socket.emit('div0', $div0)} />
        <Stepper
            {...stepper}
            bind:value={$range0}
            bind:div={$div0}
            pos={$pips[0]}
            func={() => socket.emit('range0', $range0)}
        />
        <Knob {...soundKnob} bind:value={$buf0} func={() => socket.emit('buf0', $buf0)} />
        <Knob {...pitchKnob} bind:value={$pitch0} func={() => socket.emit('pitch0', $pitch0)} />
        <Knob {...lenKnob} bind:value={$len0} func={() => socket.emit('len0', $len0)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[1]} />
        <Knob {...divKnob} bind:value={$div1} func={() => socket.emit('div1', $div1)} />
        <Stepper
            {...stepper}
            bind:value={$range1}
            bind:div={$div1}
            pos={$pips[1]}
            func={() => socket.emit('range1', $range1)}
        />
        <Knob {...soundKnob} bind:value={$buf1} func={() => socket.emit('buf1', $buf1)} />
        <Knob {...pitchKnob} bind:value={$pitch1} func={() => socket.emit('pitch1', $pitch1)} />
        <Knob {...lenKnob} bind:value={$len1} func={() => socket.emit('len1', $len1)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[2]} />
        <Knob {...divKnob} bind:value={$div2} func={() => socket.emit('div2', $div2)} />
        <Stepper
            {...stepper}
            bind:value={$range2}
            bind:div={$div2}
            pos={$pips[2]}
            func={() => socket.emit('range2', $range2)}
        />
        <Knob {...soundKnob} bind:value={$buf2} func={() => socket.emit('buf2', $buf2)} />
        <Knob {...pitchKnob} bind:value={$pitch2} func={() => socket.emit('pitch2', $pitch2)} />
        <Knob {...lenKnob} bind:value={$len2} func={() => socket.emit('len2', $len2)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blips[3]} />
        <Knob {...divKnob} bind:value={$div3} func={() => socket.emit('div3', $div3)} />
        <Stepper
            {...stepper}
            bind:value={$range3}
            bind:div={$div3}
            pos={$pips[3]}
            func={() => socket.emit('range3', $range3)}
        />
        <Knob {...soundKnob} bind:value={$buf3} func={() => socket.emit('buf3', $buf3)} />
        <Knob {...pitchKnob} bind:value={$pitch3} func={() => socket.emit('pitch3', $pitch3)} />
        <Knob {...lenKnob} bind:value={$len3} func={() => socket.emit('len3', $len3)} />
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .labels {
        margin-left: 515px;
        justify-content: center;
        color: var(--primary);
        margin: 0 auto;
    }

    .row {
        height: 50px;
    }
</style>
