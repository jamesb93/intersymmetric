<script>
    import { browser } from '$app/env';
    import { socket, numUsers, workshopID, room } from "$lib/components/stores.js";
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

        if (storedRoom !== null || storedRoom !== '') {
            socket.emit('roomJoin', createRoomID($workshopID, storedRoom));
            room.set(storedRoom)
        }
    }


</script>

<header>
    <div id="title">
        <span>Intersymmetric Works</span>
        <br>
        <span>Grid Sequencer 01</span>
    </div>
    <RoomPrompt />
    <div>
        <span>Users:</span>
        <br>
        <span>{$numUsers}</span>
    </div>
    <Editor />
</header>

<div class="line"></div>

<style>
    header {
        padding-top: 12px;
        padding-bottom: 12px;
        max-width: 35%;
        min-width: 30%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 10px;
    }

    .line {
        border-bottom: 2px solid #59a245;
        width: 100%;
    }
</style>