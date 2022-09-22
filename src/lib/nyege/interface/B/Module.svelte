<script>
    import RadioH from '$lib/nyege/RadioH.svelte';
    import RadioV from '$lib/nyege/RadioV.svelte';
    import Blip from '$lib/nyege/Blip.svelte';
    import Knob from '$lib/common/Knob.svelte';
    import { sendMessage } from '$lib/common/patch-helpers';
    import { socket } from '$lib/nyege/app';
    import { buf4, buf5, pitch4, pitch5, len4, len5, retrig0, retrig1, retrigGate0, retrigGate1 } from '$lib/nyege/app';

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
        width: '450px',
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

    let blip0, blip1;

    patch.messageEvent.subscribe(e => {
        if (e.tag === 'blip') {
            if (e.payload === 4) {
                blip0.blink();
            } else if (e.payload === 5) {
                blip1.blink();
            }
        }
    });

    $: sendMessage(patch, 'retrigger_params', [0, $retrigGate0, $retrig0]);
    $: sendMessage(patch, 'retrigger_params', [1, $retrigGate1, $retrig1]);
    $: sendMessage(patch, 'sampler_params', [4, $buf4, $pitch4, $len4]);
    $: sendMessage(patch, 'sampler_params', [5, $buf5, $pitch5, $len5]);
</script>

<div class="container">
    <div class="row grid">
        <Blip bind:this={blip0} />
        <RadioV {...tog} bind:value={$retrigGate0} func={() => socket.emit('retrigGate0', $retrigGate0)} />
        <RadioH {...cycle} bind:value={$retrig0} func={() => socket.emit('retrig0', $retrig0)} />
        <Knob {...soundKnob} bind:value={$buf4} func={() => socket.emit('buf4', $buf4)} />
        <Knob {...pitchKnob} bind:value={$pitch4} func={() => socket.emit('pitch4', $pitch4)} />
        <Knob {...lenKnob} bind:value={$len4} func={() => socket.emit('len4', $len4)} />
    </div>
    <div class="row grid">
        <Blip bind:this={blip1} />
        <RadioV {...tog} bind:value={$retrigGate1} func={() => socket.emit('retrigGate1', $retrigGate1)} />
        <RadioH {...cycle} bind:value={$retrig1} func={() => socket.emit('retrig1', $retrig1)} />
        <Knob {...soundKnob} bind:value={$buf5} func={() => socket.emit('buf5', $buf5)} />
        <Knob {...pitchKnob} bind:value={$pitch5} func={() => socket.emit('pitch5', $pitch5)} />
        <Knob {...lenKnob} bind:value={$len5} func={() => socket.emit('len5', $len5)} />
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
    .empty {
        width: 100%;
    }
</style>
