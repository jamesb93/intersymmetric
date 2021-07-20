<script>
    import {
        numLoadedSamples,
        totalNumSamples } from '$lib/samplerConfig';

    $: percent = (
        $numLoadedSamples / $totalNumSamples
    ) * 100.0
</script>

<div>
    Loading Samples, Please Wait...
    <br>
    { $numLoadedSamples } | { $totalNumSamples }

    <div class='bar'>

    </div>
</div>

<style>

    .bar {
        height: 24px;
        background-color: --primary-color;
        width: 100%;
    }
</style>