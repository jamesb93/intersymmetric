<script>
    import GridAndControls from './GridAndControls.svelte';
    import Synth from './Synth.svelte';
    import Footer from '$lib/nobounds/components/Footer.svelte';
    import Header from '$lib/nobounds/components/Header.svelte';
</script>

<div>
    <Header />
    <div class="line" />
    <GridAndControls />
    <Synth />
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
