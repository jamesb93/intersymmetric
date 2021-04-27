<script>
    export let value;
    export let title = "";
    export let func;
</script>

<div class="pad">
    {title}
    <input type="text" bind:value={value} on:change={func} />
</div>


<style>
    .pad {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .title {
        text-align: center;
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
        height: 10px;
        border-radius: 5px;   
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
        border-radius: 10%; 
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