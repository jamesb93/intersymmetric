<script>
  import Transport from '$lib/nyege/interface/Transport.svelte';
  import A from '$lib/nyege/interface/A/Module.svelte';
  import B from '$lib/nyege/interface/B/Module.svelte';
  import C from '$lib/nyege/interface/C/Module.svelte';

  export let patch;
</script>

<div class="container">
  <Transport bind:patch />
  <A bind:patch />
  <B bind:patch />
  <C bind:patch />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 2em;
    gap: 4em;
  }

  @media only screen and (min-width: 1005px) {
    .container {
      grid-template-columns: repeat(3, auto);
    }
  }

  @media only screen and (max-width: 1005px) {
    .container {
      grid-template-rows: repeat(3, auto);
    }
  }
</style>
