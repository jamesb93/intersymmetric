<script>
    import { fade } from 'svelte/transition';
</script>

<div class="links" transition:fade>
    <a class="nnnb" href="nnnb/room1">nnnb</a>
    <a class="aaa" href="aaa/room1">AAA</a>
    <a href="seq-1/idx">sequencer 01</a>
</div>

<style>
    .links {
        display: grid;
        grid-template-rows: auto auto auto;
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

    .nnnb,
    .nnnb:visited {
        color: #0540f6;
    }
    .nnnb:hover {
        color: white;
        background-color: #0540f6;
    }
</style>
