<script>
    import { socket, room, numUsers } from "$lib/components/stores.js"
	let everUsed = false;
    let code = ""
    const handleClick = () => {
        everUsed = true;
        socket.emit('roomJoin', code);
        room.set(code);
        code = "";
    }

</script>

<div class="prompt" >
    <input type="text" class:pulsate={!everUsed} bind:value={code} on:change={handleClick} placeholder="enter room code" class="code-entry"/>
    <p>
        Current connected to: {$room}
    </p>
    <p>
        There are {$numUsers} people in this room.
    </p>
</div>

<style>
    @keyframes border-pulsate {
        0%   { border: 2px solid #DDDDDD; }
        25%  { border: 2px solid #4c87af7c; }
        50% { border: 2px solid #4c87af; }
        75%  { border: 2px solid #4c87af7c; }
        100%   { border: 2px solid #DDDDDD; }
    }
    
    input[type=text], textarea {
        -webkit-transition: all 0.30s ease-in-out;
        -moz-transition: all 0.30s ease-in-out;
        -ms-transition: all 0.30s ease-in-out;
        -o-transition: all 0.30s ease-in-out;
        outline: none;
        padding: 3px 0px 3px 3px;
        border: 1px solid #DDDDDD;
        text-align: left;
        font-size: 30px;
        width: 300px;
    }
    
    input[type=text]:focus, textarea:focus {
        box-shadow: 0 0 5px #4c87af;
        padding: 3px 0px 3px 3px;
        border: 1px solid #4c87af;
    }
    .prompt {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }

    p {
        margin: 5px;
    }

    .pulsate {
        animation: border-pulsate 4s infinite;
    }
</style>