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

<div class="container">
    <Transport bind:patch/>
    <A bind:patch />
    <B bind:patch />
    <C bind:patch />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 2em;
        margin: 0 auto;
        margin-top: 2em;
    }
    .tab {
        position: fixed;
        top: 75px;
        display: grid;
        gap: 10px;
        grid-template-rows: auto auto;
        right: 0px;
    }
    button {
        background-color: white;
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
