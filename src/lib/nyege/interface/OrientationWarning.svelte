<script>
    import { onMount } from 'svelte';

    let portrait = false;
    let ignore = false;
    let isMobile = false;

    function resizeHandler() {
        portrait = window.matchMedia('(orientation: portrait)').matches;
    }

    onMount(async () => {
        resizeHandler();
        isMobile = 'ontouchstart' in document.documentElement;
    });
</script>

<svelte:window on:resize={resizeHandler} />

{#if portrait && !ignore && isMobile}
    <div class="container">
        <div class="text">Rotate your device to landscape</div>
        <button on:click={() => (ignore = true)}>okay</button>
    </div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: center;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        top: 100px;
        border: 1px solid var(--primary);
        background: white;
        font-size: 1rem;
        width: 310px;
        height: 75px;
        padding: 25px;
        color: var(--primary);
        z-index: 998;
    }

    button {
        width: max-content;
        color: var(--primary);
        border: 1px solid var(--primary);
        background-color: white;
        text-align: center;
        font-family: var(--font);
        font-size: 0.75rem;
    }

    button:hover {
        background-color: var(--light-grey);
        color: black;
    }

    button:active {
        background-color: var(--light-grey);
        color: white;
    }
</style>
