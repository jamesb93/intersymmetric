<script>
    import SequencerControl from './SequencerControl.svelte';
    import Sequencer from './Sequencer.svelte';
    import Footer from '$lib/components/Footer.svelte';

    // We define this here because the Tone.js callback is a little finnicky.
    let pos = 0;
    let prePos = 0;
</script>

<div>
    <SequencerControl bind:pos={pos} bind:prePos={prePos} />
    <Sequencer bind:prePos={prePos} />
    <Footer />
</div>