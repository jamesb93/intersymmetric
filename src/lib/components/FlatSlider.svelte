<script type="ts">
    export let value;
    export let min: string = "0";
    export let max: string = "100";
    export let title: string = "";
    export let step: string = "any";
    export let func;
</script>

<div class="pad">
    <div class="container">
        <span class="text min">{min}</span>
        <input class="slider" type="range" min={min} max={max} step={step} bind:value={value} on:input={func} />
        <span class="text max">{max}</span>
    </div>
</div>


<style>
    .pad {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
    .text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 10px;
        color: grey;
    }
    .min {
        text-align: right;
        padding-right: 2px;
    }
    .max {
        text-align: left;
        padding-left: 2px;
    }
    
    .slider {
        -webkit-appearance: none;
        width: 75%;
        height: 30px;
        border-radius: 0;   
        background: #989898;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }
    
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 50px;
        height: 30px;
        border-radius: 0; 
        background: #4caf84;
        cursor: pointer;
        border-style: none;
    }
    
    .slider::-moz-range-thumb {
        width: 50px;
        height: 30px;
        border-radius: 0%;
        background: #4caf84;
        cursor: pointer;
        border-style: none;
    }
</style>