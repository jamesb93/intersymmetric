<script>
    import Slider from './Slider.svelte';
    export let min = 0;
    export let max = 10;
    export let step = 1;
    export let bindings = [];
</script>

<div class='container'>
    {#each bindings as bind}
    <Slider bind:value={bind} min={min} max={max} steps={Math.round(max-min / step)}/>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
    }
</style>

