<script>
    import { socket, room, workshopID } from "$lib/app.js"
    import { goto } from '$app/navigation';
    import { createRoomID } from '$lib/utility.js'
	let everUsed = false;
    let code = ""
    
    function handleChange() {
        everUsed = true;
        socket.emit('roomJoin', createRoomID($workshopID, code));
        $room = code;
        const href = '/seq-1/' + code;
        goto('/seq-1/'+ $room)
        code = ""
    }
</script>
<div class="prompt" >
    <span id='title'>Room Code:</span>
    <input type="text" 
    class:init={!everUsed} 
    bind:value={code} 
    on:change={handleChange} 
    placeholder={ everUsed === false && $room === '' ? "enter room code" : $room }
    id='room-input'
    class={$$props.class}
    />
</div>

<style>
    #title {
        text-align: left;
    }
    .prompt {
        display: flex;
        flex-direction: column;
    }

    .init {
        border:1px solid rgb(204, 204, 204);
    }

    #room-input {
        font-family: var(--font);
        font-size: var(--font-size);
        padding: none;
        background: white;
        border: none;
        width: 100px;
        padding-top: 1px;
    }

    #room-input:focus, #room-input:active {
        outline: none !important;
        border:1px solid rgb(204, 204, 204);
    }
</style>