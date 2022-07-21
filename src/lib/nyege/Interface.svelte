<script>
    export let patch;
</script>

<div class="container">
	<!-- Put Stuff HERE -->
</div>

<style>
    .container {
        display: grid;
        justify-content: center;
        margin: 0 auto;
        margin-top: 2em;
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