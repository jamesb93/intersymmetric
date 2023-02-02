<script>
    import Interface from './Interface.svelte';
    import Button from './Button.svelte';
    import OrientationWarning from '$lib/nyege/interface/OrientationWarning.svelte';
    import IPhoneWarning from '$lib/nyege/interface/IPhoneWarning.svelte';
    import { createDeviceInstance } from '@jamesb93/rnbo-svelte';

    let device, context;

    const start = async () => {
        context = new (window.AudioContext || window.webkitAudioContext)();
        let output = context.createGain().connect(context.destination);
        createDeviceInstance('/seq-2/code/patch.export.json', context, output)
        	.then(response => device = response);
    }
</script>

<IPhoneWarning />
<OrientationWarning />

{#if device}
    <Interface bind:device />
{:else}
    <div class="loading">
        <Button on:click={start} height={'60px'} width={'150px'} fontSize={'24px'}>load</Button>
    </div>
{/if}

<style>
    .loading {
        margin: 10em;
    }
</style>
