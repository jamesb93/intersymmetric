<div class="container" style={style}>
    <div class="text">Play/Pause</div>
    <button on:click={onClick} class="button" class:pause={playing}></button>
</div>


<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    .text {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        font-size: 10px;
        font-family: 'Space Mono', monospace;
    }
    .button {
        border: 0;
        background: transparent;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        
        border-color: transparent transparent transparent rgba(86,158,70,255);
        transition: 100ms all ease;
        cursor: pointer;

        margin-left: 20px;
        
        border-style: solid;
        border-width: 20px 0 20px 20px;
    }
        
    .pause {
        border-style: double;
        border-width: 0px 0 0px 20px;
    }
        
    button:hover {
        border-color: transparent transparent transparent rgba(86,158,70,0.8);
    }
</style>

<script>
    const WIDTH = 80;
    const HEIGHT = 80;
    $: style = `height: ${HEIGHT}; width: ${WIDTH};`
    export let playing;
    function onClick() {
        playing = !playing;
        if (!playing) {
            pause();
        } else {
            start();
        }
    }

    export let start;
    export let pause;
</script>
