<script>
    import { clip, scale } from '$lib/utility.js';

    export let value = 1;
    export let steps = 1;
    export let min = 1;
    export let max = 5;
    export let selected = false;

    // const x = d3.scaleQuantize()
    //     .domain([0, 1])
    //     .range(d3.range(1, 10))

    // console.log(x(0.999))

    let mouseIsDown = false;
    let bar, rect;
    let calculatedHeight = '100%'
    $: if (bar) rect = bar.getBoundingClientRect();

    function update(e) {
        const y = e.clientY - rect.top;
        const step = 1 / (steps-1);
        let ratio = 1 - (y / rect.height);
        ratio = clip(ratio, 0, 1);
        ratio = Math.round((ratio - min) / step) * step + min;
        value = scale(ratio, 0, 1, min, max).toFixed();
        ratio *= 100;
        calculatedHeight = `${ratio}%`
    }

    function mouseDown(e) {
        mouseIsDown = true;
        update(e);
    }

    function mouseUp() { mouseIsDown = false }

    function mouseMove(e) {
        if (mouseIsDown) update(e)
    }
</script>

<svelte:window on:mousemove={mouseMove} on:mouseup={mouseUp} />

<div 
class="container"
class:selected={selected}
bind:this={bar}
on:mousedown={ mouseDown }
>
    <div class="progress" style:height={calculatedHeight} />
</div>

<style>
    :root {
        --colour: rgba(104,104,172,255);
    }
    .progress {
        height: 100%;
        width: 100%;
        margin: 0 auto;
        background-color: var(--primary);

    }

    .container {
        transform: rotate(180deg);
        width: 53px;
        height: 200px;
        background-color: white;
        outline: 1px solid black;
    }

    .selected {
        background-color: #e8e4e4
    }

</style>