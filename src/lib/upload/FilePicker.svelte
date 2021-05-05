<script>
    export let url;
    let files = [];
    let file;
    let base = 'http://localhost:23000/files/'
    $: url = base + file; console.log(url)

    const getFiles = () => {
        fetch('http://localhost:23000/files', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            files = data.files;
        })
    }
</script>

<button on:click={getFiles}>
    get files
</button>

<div>
    <select bind:value={file}>
        {#each files as f}
            <option value={f.fileName}>{f.fileName}</option>
        {/each}
    </select>
</div>

