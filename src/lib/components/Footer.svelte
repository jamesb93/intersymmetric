<script>
    import Editor from '$lib/components/Editor.svelte';
</script>

<div id="bottom-panel">
    <footer>
        <span>
            <a target="_blank" href="http://www.markfell.com/wiki/">Mark Fell</a> & <a target="_blank" href="https://riantreanor.bandcamp.com/">Rian Treanor</a>
        </span>
        <span>
            Commissioned by No Bounds / Hope Works 2020
        </span>
        <span>
            Programming by <a target="_blank" href="https://www.jamesbradbury.xyz">James Bradbury</a>
        </span>
        <span>
            Graphic Design by <a target="_blank" href="https://qubik.com/">Joe Gilmore</a>
        </span>
    </footer>
    <Editor />    
    <div class='donation'>
        This experience is free of charge but we emplore you to donate to the <a href='https://rema-online.org.uk/'>Rotherham Ethnic Minority Alliance (REMA).</a>
    </div>
</div>

<style>
    #bottom-panel {
        display: grid;
        grid-template-columns: auto auto 200px;
        padding-top: 10px;
    }

    footer {    
        display: flex;
        flex-direction: column;
        color: #40ac47;
        font-size: 10px;
        text-align: left;
    }

    .donation {
        font-size: 10px;
        text-align: right;
    }
</style>