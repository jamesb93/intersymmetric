<script>
    import { createDeviceInstance } from '@jamesb93/rnbo-svelte';
    import Interface from './Interface.svelte';

    /** @type {import('@rnbo/js').Device} */
    let patch;

    const start = async () => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const output = context.createGain().connect(context.destination);
        createDeviceInstance('/rss/code/patch.export.json', context, output)
        .then(response => { 
            patch = response;
        });
    };
</script>

{#if patch}
    <Interface bind:patch />
{:else}
    <button class='start-btn' on:click={start}>
        start
    </button>
{/if}

<style>
    .start-btn {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-family: var(--font);
        background-color: rgb(0, 0, 0);
        color: white;
        font-size: 5rem;
    }
</style>
