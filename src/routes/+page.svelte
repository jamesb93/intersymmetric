<script>
  import { fade } from 'svelte/transition';
</script>

<div class="links" transition:fade>
  <a href="seq-1/idx">sequencer 01</a>
  <a class="aaa" href="aaa/room1">AAA</a>
</div>

<style>
  .links {
    display: grid;
    grid-template-rows: auto auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20%;
    margin-bottom: 20%;
    justify-content: center;
    gap: 2em;
    font-size: 2rem;
  }

  .aaa,
  .aaa:visited {
    color: #ff44b4;
  }

  .aaa:hover {
    color: white;
    background-color: #ff44b4;
  }
</style>
