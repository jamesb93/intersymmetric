<script>
    import Transport from '$lib/nyege/interface/Transport.svelte';
    import A from '$lib/nyege/interface/A/Module.svelte';
    import B from '$lib/nyege/interface/B/Module.svelte';
    import C from '$lib/nyege/interface/C/Module.svelte';

    export let patch;

    let vp = false;
    let h;
    const vertBreakpoint = 600

    function scroll(e) {
        e.preventDefault();
        if (e.deltaY >= 1) {
            vp = true
        } else if (e.deltaY <= -1) {
            vp = false
        }
    }
</script>


<svelte:window 
bind:innerHeight={h} 
on:mousewheel|nonpassive={scroll} 
on:touchmove|nonpassive={scroll}
/>

<div class="container" on:click={() => vp = !vp}>
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
        margin: 0 auto;
        margin-top: 2em;
        gap: 1em;
    }
    .top {

    }
    .bottom {

    }

    .hide {
        visibility: hidden;
        height: 0;
    }

    @media only screen and (min-width: 1005px) {
        .container {
            grid-template-columns: repeat(3, auto);
        }
    }

    @media only screen and (max-width: 1005px) {
        .container {
            grid-template-rows: repeat(3, auto);
        }
    }
</style>
