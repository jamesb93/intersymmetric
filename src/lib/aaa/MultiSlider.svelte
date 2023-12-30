<script>
    import Slider from './Slider.svelte';
    export let sliders = [
        { min: 1, max: 5, steps: 5, value: 3 },
        { min: 1, max: 5, steps: 5, value: 3 },
        { min: 1, max: 5, steps: 5, value: 3 }
    ];
</script>

<div class="container">
    {#each sliders as slider}
        <Slider
            min={slider.min}
            max={slider.max}
            steps={slider.steps}
            bind:value={slider.value} />
    {/each}
</div>

{sliders[0].value}
{sliders[1].value}
{sliders[2].value}

<style>
    .container {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
</style>
