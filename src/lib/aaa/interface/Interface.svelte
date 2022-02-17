<script>
    import Clock from './Clock.svelte';
    import TimePattern from './TimePattern.svelte';
    import SoundPattern from './SoundPattern.svelte';

    export let patch;
</script>

<div class="container">
    <Clock bind:patch={patch} />
    <TimePattern bind:patch={patch} />
    <SoundPattern bind:patch={patch} />
</div>

<style>
    .container {
        display: grid;
        justify-content: center;
        margin: 0 auto;
        margin-top: 2em;
    }

    @media only screen and (min-width: 980px) {
        .container {
            grid-template-columns: repeat(3, auto);
        }
    }

    @media only screen and (max-width: 980px) {
        .container {
            grid-template-rows: repeat(3, auto);
        }
    }
</style>