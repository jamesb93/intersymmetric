<script>
    import { params } from "$lib/components/stores.js";
	$: json = JSON.stringify($params, null, 4)
    const saveTextAsFile = (textToWrite, fileNameToSaveAs) => {
    	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
    	var downloadLink = document.createElement("a");
    	downloadLink.download = fileNameToSaveAs;
    	downloadLink.innerHTML = "Download File";
    	if (window.webkitURL != null) {
    		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    	}
    	else {
    		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    		downloadLink.onclick = destroyClickedElement;
    		downloadLink.style.display = "none";
    		document.body.appendChild(downloadLink);
    	}
    	downloadLink.click();
    }
</script>

<div class="container">
	<button on:click={() => {saveTextAsFile(json, 'data.json')}}>Download</button>
</div>

<style>
	.container {
		display:flex;
		flex-direction: row;
		width: 30px;
		height: 30px;
	}
</style>