<script>
    import { socket, room, numUsers } from '$lib/app.js';

    let messageForUser = '';
    let states = {};
    let rooms = {};
    socket.on('enabledStates', data => states = data)
    socket.on('rooms', data => {
        rooms = data
    })

    const update = () => {
        socket.emit('enabledStates', states)
    }

    const joinRoom = (code) => {
        socket.emit('roomJoin', code);
        $room = code
    }

    const sendMessageForUser = () => {
        socket.emit('userMessage', messageForUser);
        messageForUser = '';
    }
</script>

<h1>Admin Page</h1>

<div class='text-info'>
    {#if $room !== ''}
    <span>You are connected to {$room}</span>
    <span>There are {$numUsers} users</span>
    {:else}
    <p>You are not connected to any room</p>
    {/if} 
</div>


<div class='container'>
    <div class="top-half">
        <div class="rooms">
            <h3>Active Rooms</h3>
            {#each Object.entries(rooms) as [k, v]}
                {#if v.numUsers > 0}
                <a 
                on:click={() => joinRoom(k)}
                class:selectedRoom={k === $room}
                >{k}</a>
                {/if}
            {/each}
        </div>
    
        <div class="states">
            <h3>Toggle Features</h3>
            {#each Object.entries(states) as [k, v]}
                <input type="checkbox" bind:checked={states[k]} on:change={update} />
                {k}<br>
            {/each}
        </div>
    </div>

    <div class='chat'>
        <input type='text' 
        bind:value={messageForUser}
        on:change={ sendMessageForUser }
        placeholder='send an admin message'
        />
    </div>
</div>

<style>
    .text-info {
        display: flex;
        flex-direction: column;
    }
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
        margin: 0 auto;
        width: 50%;
        max-width: 80%;
    }

    .top-half {
        display: flex;
        flex-direction: row;
        text-align: left;

        padding-top: 20px;
        justify-content: center;
        gap: 1em;
    }

    .rooms {
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .selectedRoom {
        font-style: italic;
    }

    .chat > input {
        font-size: 20px;
        width: 400px;
    }
</style>


