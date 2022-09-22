<script>
    import Transport from '$lib/nyege/interface/Transport.svelte';
    import A from '$lib/nyege/interface/A/Module.svelte';
    import B from '$lib/nyege/interface/B/Module.svelte';
    import C from '$lib/nyege/interface/C/Module.svelte';

    export let patch;

    let vp = false;
    let h;
    const vertBreakpoint = 600

</script>


<svelte:window 
bind:innerHeight={h} 
/>

{#if h <= vertBreakpoint}
<div class="tab">
    <button class:disabled={!vp} on:click={() => vp = false}>⬆</button>
    <button class:disabled={vp} on:click={() => vp = true}>⬇</button>
</div>
{/if}

<div class="container">
    <div class="top" class:hide={h <= vertBreakpoint && vp}>
        <Transport bind:patch/>
        <A bind:patch />
    </div>
    <div class="bottom" class:hide={h <= vertBreakpoint && !vp}>
        <B bind:patch />
        <C bind:patch />
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 2em;
        margin: 0 auto;
        margin-top: 2em;
        /* overflow-y:hidden; */
    }
    .tab {
        position: fixed;
        top: 75px;
        display: grid;
        gap: 10px;
        grid-template-rows: auto auto;
        right: 10px;
    }
    button {
        background: transparent;
        border: 1px solid var(--primary);
        font-family: var(--font);
        font-size: 10px;
        color: var(--primary);
        width: 30px;
        height: 100px;
        text-align: center;
    }
    button:hover:not(.selected) {
        background-color: var(--light-grey);
    }
    button:active:not(.selected) {
        background-color: var(--grey);
    }
    .disabled {
        opacity: 0.5;
    }
    .bottom {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }
    .hide {
        visibility: hidden;
        height: 0;
    }
</style>
