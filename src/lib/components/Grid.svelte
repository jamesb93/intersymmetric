<script>
    import { browser } from '$app/env';
    import { room } from '$lib/components/stores.js';
    import SequencerControl from './SequencerControl.svelte';
    import Sequencer from './Sequencer.svelte';
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
        <SequencerControl bind:pos={pos} bind:prePos={prePos} />
        <Sequencer bind:prePos={prePos} />
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
        top: 70px;

    }
</style>