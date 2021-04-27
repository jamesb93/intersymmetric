<script>
    import * as Tone from 'tone';
    let samplers = {};
    let selectedSampler;
    let sampler;
    $: sampler = samplers[selectedSampler];
    let ready = false;
    let uploadComplete = false;
    import Uploader from './_components/Uploader.svelte';
    import FilePicker from './_components/FilePicker.svelte';

    const getFiles = () => {
        fetch('http://localhost:3000/files', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            data.files.forEach(file => {
                samplers[file.fileName] = new Tone.Sampler({
                    urls: {'C3' : file.fileName},
                    baseUrl: 'https://treanor.s3.us-west-000.backblazeb2.com/'
                }).toDestination();
            });
            
            // Load up the first sample so there is always something
            selectedSampler = Object.entries(samplers)[0][0]; 
            ready = true;
        })
    };

    getFiles();

    const sam = () => {
        Tone.start();
        sampler.triggerAttackRelease("C3", 1);
    }
</script>


{#if uploadComplete === false}
waiting for upload...
{:else}
upload complete!
{/if}

{#if ready}
<button on:click={sam}>play</button>
{/if}

<div>
    <select bind:value={selectedSampler}>
        {#each Object.entries(samplers) as [k, v]}
            <option value={k}>{k}</option>
        {/each}
    </select>
</div>

<!-- <Uploader /> -->
<!-- <FilePicker /> -->




