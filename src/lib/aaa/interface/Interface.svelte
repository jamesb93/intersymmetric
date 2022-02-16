<script>
    import Clock from './Clock.svelte';
    import TimePattern from './TimePattern.svelte';
    import SoundPattern from './SoundPattern.svelte';

</script>

<div class="container">
    <Clock />
    <TimePattern />
    <SoundPattern />
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