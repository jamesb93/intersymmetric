<script>
    import { socket, room, numUsers } from "./stores.js"
	let everUsed = false;
    let code = ""
    const handleClick = () => {
        everUsed = true;
        socket.emit('roomJoin', code)
        localStorage.setItem("mfrtjbcode", code);
        room.set(code)
        code = ""
    }

</script>

<div class="prompt" >
    <div class="room-code">
        {$room}
        <input 
        type="text" 
        class:pulsate={!everUsed} 
        bind:value={code} 
        on:change={handleClick} 
        placeholder="enter room" 
        class="code-entry"
        />
    </div>
</div>

<style>

    input[type=text] {
    	/* font-family: 'Major Mono Display', monospace; */
        font-family: 'Courier Prime', monospace;
        display: inline;
        font-family: inherit;
        font-size: inherit;
        padding: none;
        width: auto;
        background: rgba(243,243,246,255);
        border: none;
        font-style: italic;
    }
    
    .prompt {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
    }

    .code-entry {
        text-align: center;
    }

    .room-code {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .code-entry:focus {
        border: none !important;
        border:1px solid red;
        box-shadow: 0 0 10px #8fce71;
    }
</style>