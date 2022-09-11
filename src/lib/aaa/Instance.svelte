<script>
    import Interface from './interface/Interface.svelte';
    import Button from './Button.svelte';
    import { loadSamples, createInstance } from '$lib/common/patch-helpers';

    let patch, context;
    let samplesLoaded = false;

    const start = async () => {
        context = new (window.AudioContext || window.webkitAudioContext)();
        let output = context.createGain().connect(context.destination);
        createInstance('/aaa/code/patch.export.json', context, output).then(response => {
            patch = response;
            loadSamples(patch, context, 46, 'b.', '/aaa/samples/', 0);
            samplesLoaded = true;
        });
    };
</script>

{#if patch && samplesLoaded}
    <Interface bind:patch />
{:else}
    <div class="loading">
        <Button on:click={start} height={'60px'} width={'100px'} font_size={'24px'}>load</Button>
    </div>
{/if}

<!-- <a href='https://www.dropbox.com/sh/w7uso18978mbcu5/AAA9g_0PD4BaO-L1rnbvHb2Ha?dl=0'>presets</a> -->
<style>
    .loading {
        margin: 10em;
    }
</style>
