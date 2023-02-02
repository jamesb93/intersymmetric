<script>
	export let device;
    import { sendDeviceMessage } from '@jamesb93/rnbo-svelte';
	import Grid from './interface/Grid.svelte';

    let on = false;
    const toggleState = () => {
        on = !on;
        sendDeviceMessage(device, 'state', [on])
    }
</script>

<button on:click={toggleState}>
switcherooni
</button>

<div class="container">
	<Grid bind:device />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 2em;
        margin: 0 auto;
        margin-top: 2em;
    }
</style>