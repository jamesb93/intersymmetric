<script>
    export let scale = 2;
    export let func = () => {};
    export let title = ""
    export let value;
    export let min;
    export let max;
    
    let shift = false;
    let step = shift ? 1.0 : 0.1;
    let internalValue = value;
    let mousedown = false;
    let internalScale;
    function moveHandler(e) {
        if (mousedown) {
            // add difference to the current value
            internalValue += e.movementY * -1 * scale * internalScale
            internalValue = parseFloat(internalValue).toFixed(2);
            value = internalValue
        }
    }

    function handleMouseDown(e) {
        mousedown = true;
        internalScale = 1 - (e.layerX / 80);
    }

    function handleMouseUp() {
        mousedown = false;
    }
    
    function keyDownHandler(e) {
        if (e.key === "Enter") {
            if (internalValue > 0 && internalValue === internalValue) {
                value = internalValue;
                func();
            } else {
                internalValue = 0;
            }
        }
    }
</script>

<!-- on:mousemove={ moveHandler }  -->
<!-- on:mouseup={ handleMouseUp }  -->
<svelte:window 
on:keydown={ keyDownHandler }
/>
<div class="container">
    <span class="title">{title}</span>
    <input 
    type="number" 
    on:mousedown={ handleMouseDown } 
    bind:value={ internalValue }
    placeholder="enter a value" 
    step={step}
    />
    <span class="title">{value}</span>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid grey;
        width: 110px;
        border-radius: 3px;
    }
    input { 
        text-align: center;
        width: 80px;
        background-color: rgb(160, 160, 160);
        color: white;
        border: 1px solid black;
        font-size: 14px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    input:focus {
        background-color: rgb(145, 145, 145);
    }

    .title {
        font-size: 10px;
    }
</style>