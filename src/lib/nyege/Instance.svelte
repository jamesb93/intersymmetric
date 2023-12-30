<script>
    import Interface from './Interface.svelte';
    import Button from './Button.svelte';
    import OrientationWarning from '$lib/nyege/interface/OrientationWarning.svelte';
    import IPhoneWarning from '$lib/nyege/interface/IPhoneWarning.svelte';
    import { loadSamples, createDeviceInstance } from '@jamesb93/rnbo-svelte';

    let patch, context;
    let samplesLoaded = false;

    const start = async () => {
        context = new (window.AudioContext || window.webkitAudioContext)();
        let output = context.createGain().connect(context.destination);
        createDeviceInstance('/nyege/code/patch.export.json', context, output).then(
            (response) => {
                patch = response;
                const samples = new Array(33).fill(0).map((_, i) => ({
                    url: `/nyege/samples/${i}.mp3`,
                    buffer: `b.${i + 1}`
                }));
                loadSamples(patch, context, samples);
                samplesLoaded = true;
            }
        );
    };
</script>

<IPhoneWarning />
<OrientationWarning />

{#if patch && samplesLoaded}
    <Interface bind:patch />
{:else}
    <div class="loading">
        <Button on:click={start} height={'60px'} width={'150px'} fontSize={'24px'}
            >load</Button>
    </div>
{/if}

<style>
    .loading {
        margin: 10em;
    }
</style>
