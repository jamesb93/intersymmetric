<script>
    export let direction;
    export let func = () => {};

    export const WIDTH = 50;
    export const HEIGHT = 50;

    const MID_Y = HEIGHT / 2;
    const MID_X = WIDTH / 2;

    const LEFT = WIDTH * 0.4;
    const RIGHT = WIDTH * 0.6;
    const TOP = HEIGHT * 0.3;
    const BOT = HEIGHT * 0.7;
    
    let hovered;

    const enter = () => { hovered = true };
    const leave = () => { hovered = false };
</script>

<svg width={WIDTH} height={HEIGHT}
class:hidden={!hovered}
on:mouseenter={enter} 
on:mouseleave={leave} 
on:click = {func}
>
    <!-- LEFT -->
    {#if direction==="left"}
        <line x1={LEFT} x2={RIGHT} y1={MID_Y} y2={TOP} />
        <line x1={LEFT} x2={RIGHT} y1={MID_Y} y2={BOT} />
    {/if}

    <!-- RIGHT -->
    {#if direction==="right"}
        <line x1={LEFT} x2={RIGHT} y1={TOP} y2={MID_Y} />
        <line x1={LEFT} x2={RIGHT} y1={BOT} y2={MID_Y} />
    {/if}

    {#if direction==="down"}
        <line x1={HEIGHT*0.3} x2={MID_X} y1={HEIGHT*0.4} y2={HEIGHT*0.6} />
        <line x1={HEIGHT*0.7} x2={MID_X} y1={HEIGHT*0.4} y2={HEIGHT*0.6} />
    {/if}

    {#if direction==="up"}
    <line x1={HEIGHT*0.3} x2={MID_X} y1={HEIGHT*0.6} y2={HEIGHT*0.4} />
    <line x1={HEIGHT*0.7} x2={MID_X} y1={HEIGHT*0.6} y2={HEIGHT*0.4} />
    {/if}

</svg>



<style>

    line {
       stroke: rgba(118,167,112,255);
       stroke-width: 1px;
    }

    
    .hidden {
        opacity: 0.23;
        transition: opacity 0.35s;
    }
</style>