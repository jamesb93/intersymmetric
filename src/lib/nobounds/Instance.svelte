<script>
    import * as Tone from 'tone';
    import BoxButton from './components/BoxButton.svelte';
    import Interface from './Interface.svelte';
    import OrientationWarning from '$lib/nyege/interface/OrientationWarning.svelte';
    import IPhoneWarning from '$lib/nyege/interface/IPhoneWarning.svelte';

    let loaded = false;

    async function start() {
        Tone.start();
        loaded = true;
    }
</script>

<IPhoneWarning />
<OrientationWarning />

{#if loaded}
    <Interface />
{:else}
    <div class="loading">
        <BoxButton text="load" on:click={start} />
    </div>
{/if}

<style>
    .loading {
        margin: 10em;
    }
</style>
