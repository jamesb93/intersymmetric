<script>
    import Play from '$lib/nyege/Play.svelte';
    import Knob from '$lib/nyege/Knob.svelte';
    import { send_message } from '$lib/common/patch_helpers';
    import { socket, rate } from '$lib/nyege/app';

    export let patch;
    let playing = false;

    const rate_knob = {
        title: 'rate',
        min: 0,
        max: 1,
        step: 0.01,
        scale: 0.01,
        reset_value: 0.5,
        show_value: true
    };

    $: send_message(patch, 'rate', [$rate]);
    $: send_message(patch, 'state', [playing]);
</script>

<div class="container">
    <Play bind:state={playing} />
    <Knob {...rate_knob} bind:value={$rate} func={() => socket.emit('rate', $rate)} />
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
    }
</style>
