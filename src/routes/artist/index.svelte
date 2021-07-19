<script>
    import { socket, room, workshopID } from "$lib/app.js"
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { createRoomID } from '$lib/utility.js'

    export let route = '/artist/';
    
    function handleButton() {
        const href = route + 'nameofartist';
        console.log(href)
        goto(href)
    }
</script>


<div class='container' transition:fade>
    <span id='title'>dont be a dick
    </span>
    <button
    on:click={ handleButton }>
    Join
    </button>
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

    #room-input {
        font-family: var(--font);
        font-size: 20px;
        padding: none;
        background: white;
        border: none;
        width: 200px;
        padding-top: 1px;
        text-align: center;
    }

    #room-input:focus, #room-input:active {
        outline: none !important;
        border:1px solid rgb(204, 204, 204);
    }
    #title {
        text-align: center;
    }

    .init {
        border:1px solid rgb(204, 204, 204);
    }


</style>