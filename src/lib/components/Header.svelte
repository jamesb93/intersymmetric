<script>
    import { browser } from '$app/env';
    import { page } from '$app/stores';
    import { 
        socket, 
        numUsers, 
        workshopID, 
        room, recentParamValue, recentParamName
    } from "$lib/components/stores.js";
	import { createRoomID } from '$lib/components/utility.js';
    import RoomPrompt from "$lib/components/RoomPrompt.svelte";
	import Editor from "$lib/components/Editor.svelte";

    let storedRoom = null;

    if (browser) {
        storedRoom = localStorage.getItem(
            createRoomID($workshopID, "mfrtjbcode")
        );

        if (storedRoom === null) {
            storedRoom = ''
        }

        if (storedRoom !== null && storedRoom !== '') {
            socket.emit('roomJoin', createRoomID($workshopID, storedRoom));
            room.set(storedRoom)
        }
    }

    console.log("%c Intersymmetric Version 0.1", 'background: #222; color: #bada55');
</script>

<header>
    <div id="title">
        <span>Intersymmetric Works</span>
        <br>
        <span>Grid Sequencer 01</span>
</div>
    <RoomPrompt />
    <div>
        <span>Users: {$numUsers}</span>
    </div>
    {#if $page.path !== '/rewire'}
        <Editor />
    {/if}
    <div id="recent-params">
        {$recentParamName}
        {parseFloat($recentParamValue).toFixed(2)}
    </div>
</header>

<div class="line"></div>

<style>
    #recent-params {
        display: flex;
        flex-direction: column;
        padding-left: 40px;
        width: 100px;
    }

    header {
        padding-top: 12px;
        padding-bottom: 12px;
        max-width: 40%;
        min-width: 30%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 10px;
    }

    .line {
        border-bottom: 2px solid #40ac47;
        width: 100%;
    }
</style>