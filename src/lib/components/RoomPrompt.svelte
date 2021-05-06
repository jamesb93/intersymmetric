<script>
    import { socket, room, workshopID } from "$lib/components/stores.js"
    import { createRoomID } from '$lib/components/utility.js'
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
    <div id="room-name">
        {#if $room !== undefined}
            {$room}
        {/if}
    </div>
    <input 
    type="text" 
    class:pulsate={!everUsed} 
    bind:value={code} 
    on:change={handleClick} 
    placeholder="enter room" 
    class="code-entry"
    />
</div>

<style>
    .prompt {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }
    #room-name {
        height: 13px;
        padding-bottom: 2px;
        text-align: center;
    }

    input[type=text] {
        font-family: 'Courier Prime', monospace;
        display: inline;
        font-family: inherit;
        font-size: inherit;
        padding: none;
        align-self: center;
        background: rgba(243,243,246,255);
        border: none;
        font-style: italic;
    }

    .code-entry {
        text-align: center;
    }

    .code-entry:focus {
        border: none !important;
        border:1px solid red;
        box-shadow: 0 0 10px #8fce71;
    }
</style>