<script>
    import { browser } from '$app/env';
    import { room } from '$lib/app.js';
    import { page } from '$app/stores.js'
    import SeqCtrlSynth from '$lib/components/SeqCtrlSynth.svelte';
    import SeqCtrlSample from '$lib/components/SeqCtrlSample.svelte';
    import SeqSynth from '$lib/components/SeqSynth.svelte';
    import SeqSample from '$lib/components/SeqSample.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';
    // We define this here because the Tone.js callback is a little finnicky.
    let pos = 0;
    let prePos = 0;
</script>

<div>
    <Header />
	<div class='line' />
    {#if browser && $room !== ''}
        {#if $page.path.slice(0, 7) === '/seq-1/'}
        <SeqCtrlSynth bind:pos={pos} bind:prePos={prePos} />
        <SeqSynth bind:prePos={prePos} />
        {/if}

        {#if $page.path.slice(0, 12) === '/seq-sample/'}
        <SeqCtrlSample bind:pos={pos} bind:prePos={prePos} />
        <SeqSample bind:prePos={prePos} />
        {/if}
    {/if}
    <Footer />
</div>

<style>
    .line {
        border-bottom: 1px solid #40ac47;
        position: absolute;
        left: 0;
        right: 0px;
        bottom: 10;
        top: 50px;
    }
</style>