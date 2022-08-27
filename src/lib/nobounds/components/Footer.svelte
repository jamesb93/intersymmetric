<script>
    import Editor from '$lib/nobounds/components/Editor.svelte';
</script>

<div id="bottom-panel">
    <footer>
        <span>
            <a target="_blank" href="http://www.markfell.com/wiki/">Mark Fell</a> and
            <a target="_blank" href="https://riantreanor.bandcamp.com/">Rian Treanor</a>
        </span>
        <span>
            Programming by <a target="_blank" href="https://www.jamesbradbury.net">James Bradbury</a>
        </span>
        <span>
            Graphic Design by <a target="_blank" href="https://qubik.com/">Joe Gilmore</a>
        </span>
        <span> Comissioned by No Bounds 2021 </span>
    </footer>
    <Editor />
    <div class="donation">
        Make a donation to Rotherham Ethnic Minority Alliance <a
            target="_blank"
            href="https://www.crowdfunder.co.uk/intersymmetric-performance-donation">here</a
        >
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
        visibility: hidden;
        font-size: 10px;
        text-align: right;
    }
</style>
