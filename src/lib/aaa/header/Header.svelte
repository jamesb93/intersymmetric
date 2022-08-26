<script>
  import RoomPrompt from '$lib/aaa/header/RoomPrompt.svelte';
  import { num_users } from '$lib/aaa/app';
  console.log('%c Intersymmetric Version 0.3', 'background: #222; color: #bada55');
</script>

<header>
  <div id="title">
    <span class="no-hover">Intersymmetric Works</span>
    <span class="no-hover">AAA</span>
  </div>
  <div id="room">
    <RoomPrompt />
  </div>
  <div id="participants">
    <span class="no-hover">Players:</span>
    <span class="no-hover">{$num_users}</span>
  </div>
</header>

<div class="line" />

<style>
  :root {
    --h: 40px;
  }
  header {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
    max-width: 1005px;
    margin: 0 auto;
    font-size: 10px;
    min-height: var(--h);
    max-height: var(--h);
    padding-top: 10px;
  }

  @media only screen and (max-width: 1005px) {
    header {
      justify-content: space-around;
    }
  }

  #title {
    text-align: left;
    word-wrap: none;
    display: flex;
    flex-direction: column;
  }

  #participants {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .line {
    border-bottom: 1px solid var(--primary);
    position: absolute;
    left: 0;
    right: 0px;
    bottom: 10;
    top: 50px;
  }
</style>
