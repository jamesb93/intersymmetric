<script>
    export let func = () => {};
    export let text = "";
</script>

<button on:click={func}>
    <div id='text'>{text}</div>
</button>

<style>
    button {
        border-radius: 30px;
        background-color: #ffffff;
        border: 1px solid rgba(86,158,70,255);
        height: 30px;
        width: 100px;
    }

    button:hover {
        background-color: #ededed;
    }

    button:active {
        background-color: rgba(86,158,70,255);
    }

    button:active > #text {
        color: white;
    }

    #text {
        font-family: 'Space Mono', monospace;
        color: black;
        font-size: 10px;
        text-align: center;
    }
</style>