<script>
    import { FileUploader } from 'carbon-components-svelte';
    import Interface from './Interface.svelte';
    import * as RNBO from '@rnbo/js';

    /** @type {import('@rnbo/js').Device} */
    let device;
    let interacted = false;

    // Audio State
    /** @type {AudioContext} */
    let context;

    /** @type {AudioNode} */
    let output;

    function initAudio() {
        context = new (window.AudioContext || window.webkitAudioContext)();
        output = context.createGain().connect(context.destination);
    }
</script>

{#if !context && !output}
    <button on:click={initAudio}>press me to unlock audio</button>
{:else if device && context && output}
    <Interface bind:device />
{:else}
    <FileUploader
        labelTitle=""
        buttonLabel="Add patch"
        accept={['.json']}
        on:change={(e) => {
            const file = e.detail[0];
            const reader = new FileReader();
            reader.onloadend = async (x) => {
                const patcher = await JSON.parse(x.target.result);
                device = await RNBO.createDevice({ context, patcher });
                device.node.connect(output);
            };
            reader.readAsBinaryString(file);
        }} />
{/if}

<style>
    .start-btn {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-family: var(--font);
        background-color: rgb(0, 0, 0);
        color: white;
        font-size: 5rem;
    }
</style>
