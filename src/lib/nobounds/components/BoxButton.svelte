<script>
    export let text = '';
</script>

<button on:click>
    <div id="text">{text}</div>
</button>

<style>
    button {
        border-radius: 30px;
        background-color: #ffffff;
        border: 1px solid #40ac47;
        height: 27px;
        width: 80px;
        min-height: 27px;
        max-height: 27px;
        max-width: 80px;
        min-width: 80px;
    }

    button:hover {
        background-color: #ededed;
    }

    button:active {
        background-color: #40ac47;
    }

    button:active > #text {
        color: white;
    }

    #text {
        font-family: var(--font);
        color: black;
        font-size: 10px;
        text-align: center;
    }
</style>
