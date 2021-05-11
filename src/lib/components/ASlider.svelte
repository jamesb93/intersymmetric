<script>
    import { recentParamName, recentParamValue } from './stores.js';
    export let value;
    export let min = "0";
    export let max = "100";
    export let title = "";
    export let step = "any";
    export let func = () => {};
    export let logScale = false;
    let tempValue = value;

    $: $recentParamValue = value; 
    $: value, $recentParamName = title;

    function inputFunc() {
        value = tempValue;
        func();
    }

    function updateText() {
        if (logScale) {
            value = mtof(ftom(value));
        }
        tempValue = value;
        func();
    }

    function ftom(x) {
        return Math.log2(x / 440.0) + 69.0
    }

    function mtof(x) {
        return Math.pow(2, (x - 69.0)) * 440
    }
</script>

<div class="pad">
    <span class="text title">{title} | {value.toFixed(2)}</span>
    <div class="container">
        <span class="text min">{min}</span>
        <input class="slider" type="range" min={min} max={max} step={step} bind:value={value} on:input={updateText} />
        <span class="text max">{max}</span>
    </div>
    <input class="numbox" type="number" step={0.01} bind:value={tempValue} on:change={inputFunc} />
</div>


<style>
    .numbox {
        margin: 5px;
        width: 50%;
        font-family: var(--font);
    }
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

    .title {
        text-align: center;
    }
    
    .text {
        font-family: var(--font);
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
        height: 3px;
        border-radius: 50%;  
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }
    
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 17px;
        height: 17px;
        border-radius: 50%;
        background: #4c87af;
        cursor: pointer;
    }
    
    .slider::-moz-range-thumb {
        width: 17px;
        height: 17px;
        border-radius: 50%;
        background: #4c87af;
        cursor: pointer;
    }
</style>