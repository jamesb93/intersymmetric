<script>
    import Interface from './Interface.svelte';
    import Button from './Button.svelte';
    import OrientationWarning from '$lib/nyege/interface/OrientationWarning.svelte';
    import IPhoneWarning from '$lib/nyege/interface/IPhoneWarning.svelte';
    import { createDeviceInstance } from '$lib/common/rnbo/helpers';
    import { 
        kick_level,
        metal_level,
        snare_level,
        fm_level
    } from '$lib/seq-2/app';

    /** @type {import('@rnbo/js').Device} */
    let device; 
    /** @type {AudioContext} */
    let context; 

    const start = async () => {
        context = new (window.AudioContext)();
        let output = context.createGain().connect(context.destination);
        createDeviceInstance('/seq-2/patch.json', context, output)
        .then(response => {
            device = response;
            device.messageEvent.subscribe(e => {
                switch (e.tag) {
                    case 'kick_env':
                        kick_level.set(e.payload);
                        break;
                    case 'snare_env':
                        snare_level.set(e.payload);
                        break;
                    case 'metal_env':
                        metal_level.set(e.payload);
                        break;
                    case 'fm_env':
                        fm_level.set(e.payload)
                        break;
                    default:
                        break
                }
            })
        });



    };
</script>

<IPhoneWarning />
<OrientationWarning />

{#if device}
    <Interface bind:device />
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
