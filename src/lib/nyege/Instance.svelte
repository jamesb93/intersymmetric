<script>
    import Interface from './Interface.svelte';
    import Button from './Button.svelte';
    import { loadSamples, createInstance } from '$lib/common/patch-helpers';

    let patch, context;
    let samplesLoaded = false;

    const start = async () => {
        context = new (window.AudioContext || window.webkitAudioContext)();
        let output = context.createGain().connect(context.destination);
        createInstance('/nyege/code/patch.export.json', context, output)
        .then(response => {
            patch = response
            loadSamples(patch, context, 33, 'b.', '/nyege/samples/', 1);
            samplesLoaded = true;
        })
        
    };
</script>

{#if patch && samplesLoaded}
    <Interface bind:patch />
{:else}
    <div class="loading">
        <Button on:click={start} height={'60px'} width={'150px'} fontSize={'24px'}>load</Button>
    </div>
{/if}

<style>
    .loading {
        margin: 10em;
    }
</style>
