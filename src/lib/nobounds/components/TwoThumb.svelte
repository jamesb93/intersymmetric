<!-- https://codepen.io/thebabydino/pen/NWWerZG -->

<script>
    let mouseDown = false;
    let selected = 'one';
    let svg;
    let w;
    let h = 15;
    let steps = w / 16;
    let pos = {
        one : Math.round(steps * 1),
        two : Math.round(steps * 4)
    }

    $: pos.one = Math.min(Math.max(pos.one, 0), pos.two)
    $: pos.two = Math.min(Math.max(pos.two, 0), w)

    function mouseDownSVG(e) {
        mouseDown = true;
        // Determine the closest one;
        const dist1 = Math.abs(e.offsetX - pos.one);
        const dist2 = Math.abs(e.offsetX - pos.two);
        if (dist1 >= dist2) {
            selected = 'two';
        } else {
            selected = 'one';
        }
    }

    function mouseUp() {
        mouseDown = false;
    }

    function mouseMove(e) {
        if (mouseDown) {
            pos[selected] = Math.round(e.offsetX / 16) * 16;
        }
    }
</script>

<svelte:window on:mousemove={mouseMove} on:mouseup={mouseUp} />
<svg height={h} width="100%" bind:this={svg} on:mousedown={mouseDownSVG}>
    <line 
    class="thumb" 
    x1={pos.one} x2={pos.one} 
    y1=0 y2={h} 
    />
    <line 
    class="thumb" 
    x1={pos.two} x2={pos.two} 
    y1=0 y2={h} 
    />
    <line 
    class="filler"
    stroke-width={h}
    x1={pos.one}
    x2={pos.two}
    y1={h / 2}
    y2={h / 2}
    />
</svg>


<style>
    svg {
        border: 1px solid rgba(128, 128, 128, 0.404);
        width: 100%;
    }

    .thumb {
        stroke: black;
        stroke-width: 2px;
    }

    .filler {
        stroke: green;
    }
</style>