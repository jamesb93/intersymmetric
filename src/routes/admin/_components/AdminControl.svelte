<script>
    import { socket, room } from "../../_components/stores.js"
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
</script>

<div class="container">
    <div class="states">
        {#each Object.entries(states) as [k, v]}
            <input type="checkbox" bind:checked={states[k]} on:change={update} />
            {k}<br>
        {/each}
    </div>
    
    <div class="rooms">
        <p>Active Rooms</p>
        {#each Object.entries(rooms) as [k, v]}
            {#if v.numUsers >= 1}
            <a on:click={() => joinRoom(k)}>{k}</a><br>
            {/if}
        {/each}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content:space-between;
    }

    .rooms {
        margin-right: 5em;
    }
</style>


