<script>
    import Interface from './Interface.svelte';
    import { createDeviceInstance, sendDeviceMessage } from '$lib/common/rnbo/helpers';
    import { onMount } from 'svelte';

    /** @type {import('@rnbo/js').Device | null} */
    let device = null;
    /** @type {HTMLDialogElement} */
    let modal;
    let showModal = true;
    let active = false;

    onMount(() => {
        if (modal) modal.showModal();
    });

    const start = async () => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const output = context.createGain().connect(context.destination);
        try {
            device = await createDeviceInstance('/rss/code/patch.export.json', context, output);
            active = true; // Set initial state to active
            showModal = false;
            if (modal) modal.close();
        } catch (error) {
            console.error('Error creating device:', error);
        }
    };

    $: if (device && !showModal) {
        sendDeviceMessage(device, 'on_off', [active ? 1 : 0]);
    }
</script>

<Interface {device} bind:active />

{#if showModal}
    <dialog bind:this={modal}>
        <button class="start-btn" on:click={start}>START</button>
    </dialog>
{/if}

<style>
    dialog {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        border: none;
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000
    }

    dialog::backdrop {
        background-color: transparent;
    }

    .start-btn {
        font-family: var(--font);
        font-size: 2rem;
        font-weight: bold;
        color: black;
        background-color: yellow;
        border: 2px solid black;
        padding: 15px 30px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .start-btn:focus {
        outline: none;
    }
</style>