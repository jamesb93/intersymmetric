<script>
    import Interface from './interface/Interface.svelte';
    import Button from './Button.svelte';
    import { loadSamples, createDeviceInstance } from '@jamesb93/rnbo-svelte';
    import { onDestroy } from 'svelte';

    let patch, context;
    let samplesLoaded = false;

    onDestroy(() => {
        if (context) {
            context.close();
        }
    });

    const start = async () => {
        context = new (window.AudioContext || window.webkitAudioContext)();
        let output = context.createGain().connect(context.destination);
        createDeviceInstance('/aaa/code/patch.export.json', context, output).then(
            (response) => {
                patch = response;
                const samples = new Array(46).fill(0).map((_, i) => ({
                    url: `/aaa/samples/${i}.mp3`,
                    buffer: `b.${i}`
                }));
                loadSamples(patch, context, samples);
                samplesLoaded = true;
            }
        );
    };
</script>

{#if patch && samplesLoaded}
    <Interface bind:patch />
{:else}
    <div class="loading">
        <Button on:click={start} height={'60px'} width={'100px'} font_size={'24px'}
            >load</Button>
    </div>
{/if}

<style>
    .loading {
        margin: 10em;
    }
</style>
