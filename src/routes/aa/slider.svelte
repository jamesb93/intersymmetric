<script>
    import Slider from '$lib/aa/Slider.svelte';
</script>

<div>
    <Slider min={1} max={5} value={3} step={1} />
    <Slider min={1} max={5} value={3} step={1} />
    <Slider min={1} max={5} value={3} step={1} />
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        width: 50%;
        gap: 1em;
        margin: 0 auto;
        margin-top: 20em;
    }
</style>