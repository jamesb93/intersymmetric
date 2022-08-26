<script>
  import { numLoadedSamples, totalNumSamples } from '$lib/nobounds/samplerConfig';
</script>

<div>
  Loading Samples, Please Wait...
  <br />
  {$numLoadedSamples} | {$totalNumSamples}

  <div class="bar" />
</div>

<style>
  .bar {
    height: 24px;
    background-color: --primary-color;
    width: 100%;
  }
</style>
