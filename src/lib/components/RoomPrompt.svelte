<script>
    import { socket, room, workshopID } from "$lib/app.js"
    import { createRoomID } from '$lib/utility.js'
	let everUsed = false;
    let code = ""
    
    const handleClick = () => {
        everUsed = true;
        socket.emit('roomJoin', createRoomID($workshopID, code))
        localStorage.setItem(
            createRoomID($workshopID, "mfrtjbcode"), 
            code
        );
        room.set(code)
        code = ""
    }
</script>
<div class="prompt" >
    <span id='title'>Room Code:</span>
    <input 
    type="text" 
    class:init={!everUsed} 
    bind:value={code} 
    on:change={handleClick} 
    placeholder={ everUsed === false && $room === '' ? "enter room code" : $room }
    id='room-input'
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