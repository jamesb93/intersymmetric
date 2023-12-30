<script>
    import { FileUploaderDropContainer } from 'carbon-components-svelte';
    import Interface from './Interface.svelte';
    import * as RNBO from '@rnbo/js';

    /** @type {import('@rnbo/js').Device} */
    let device;
</script>

{device}

{#if device}
    <Interface bind:device />
{:else}
    <FileUploaderDropContainer
        labelText="Drag and drop files here or click to upload"
        validateFiles={(files) => {
            return files.filter((file) => file.type === 'application/json');
        }}
        on:change={(e) => {
            const file = e.detail[0];
            const reader = new FileReader();
            reader.onloadend = async (x) => {
                const patcher = await JSON.parse(x.target.result);
                const context = new (window.AudioContext || window.webkitAudioContext)();
                const output = context.createGain().connect(context.destination);
                device = await RNBO.createDevice({ context, patcher });
                device.node.connect(output);
            };
            reader.readAsBinaryString(file);
        }} />
    <!-- <button class='start-btn' on:click={start}>
        start
    </button> -->
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
