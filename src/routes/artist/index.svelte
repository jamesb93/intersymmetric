<script>
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';

    import BoxButton from '$lib/components/BoxButton.svelte';

    export let route = '/artist/';
    
    function handleButton() {
        const href = route + 'nameofartist';
        goto(href)
    }
</script>


<div class='container' transition:fade>
    <span id='title'>instructions on how to be a nice person (this is for you to decide Mark/Rian)
    </span>

    <BoxButton text='Join' func={ handleButton } />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        max-width: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
    }
</style>