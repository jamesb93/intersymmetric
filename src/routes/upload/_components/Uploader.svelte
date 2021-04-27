<script>
let inputForm;
let inputFile;
export let uploadComplete = false;
const handleUpload = () => {
    uploadComplete = false
    const formData = new FormData();
    formData.append('sampleFile', inputFile.files[0]);
    const options = {
        method: 'POST',
        body: formData
    }

    fetch('http://localhost:3000/upload', options)
    .then(response => response.json())
    .then(data => {
        uploadComplete = data.status === 'ok'
    })
    .catch(err => {
        console.log(err)
    })
}
</script>

<form bind:this={inputForm}
    on:submit|preventDefault={handleUpload}
    ref='uploadForm' 
    >
    <input type="file" name="sampleFile" bind:this={inputFile} />
    <input type='submit' value='upload' />
</form> 