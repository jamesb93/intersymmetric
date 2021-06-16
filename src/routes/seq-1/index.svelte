<script>
    import { socket, room, workshopID } from "$lib/app.js"
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { createRoomID } from '$lib/utility.js'
	let everUsed = false;
    let code = ""
    
    function handleChange() {
        everUsed = true;
        socket.emit('roomJoin', createRoomID($workshopID, code));
        $room = code;
        const href = '/seq-1/' + code;
        console.log(href);
        goto('/seq-1/'+ $room)
        code = ""
    }
</script>

<div class='container' transition:fade>
    <span id='title'>Enter Room Code</span>
    <input type='text'
        class:init={!everUsed} 
        bind:value={code} 
        on:change={handleChange} 
        placeholder={ everUsed === false && $room === '' ? '...' : $room }
        id='room-input'
    />
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