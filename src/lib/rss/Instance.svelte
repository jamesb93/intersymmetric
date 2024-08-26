<script>
    import Interface from './Interface.svelte';
    import { createDeviceInstance } from '$lib/common/rnbo/helpers';

    /** @type {import('@rnbo/js').Device} */
    let device;

    const start = async () => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const output = context.createGain().connect(context.destination);
        createDeviceInstance('/rss/code/patch.export.json', context, output).then(
            (response) => {
                device = response;
            }
        );
    };
</script>

{#if device}
    <Interface bind:device />
{:else}
    <button class="start-btn" on:click={start}> start </button>
{/if}

<style>
    .start-btn {
        place-items: center;
        font-family: var(--font);
        background-color: rgb(0, 0, 0);
        color: white;
        font-size: 2rem;
    }
</style>
