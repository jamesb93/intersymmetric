<script>
    import { browser } from '$app/environment';
    import Grid from '$lib/nobounds/components/Grid.svelte';
    import Snare from '$lib/nobounds/components/Control/Snare.svelte';
    import Kick from '$lib/nobounds/components/Control/Kick.svelte';
    import Metal from '$lib/nobounds/components/Control/Metal.svelte';
    import FM from '$lib/nobounds/components/Control/FM.svelte';
    import { metal1, metal2, fm1, fm2 } from '$lib/nobounds/instruments/ensemble.js';
    import { workshopID, room, socket } from '$lib/nobounds/app.js';
    import { createRoomID } from '$lib/utility.js';

    /** @type {import('./$types').PageData} */
    export let data;
    console.log(data, '+page')

    $workshopID = 'nobounds';
    $room = data.id;
    socket.emit('roomJoin', createRoomID($workshopID, data.id));
    console.log(createRoomID($workshopID, data.id));
</script>

<div class="main-layout">
    <Grid mode={'synth'} />
    {#if browser}
    <div class="synth-controls">
        <Snare hide={true} />
        <Kick hide={true} />
        <Metal id="metal1" instrument={metal1} hide={true} />
        <Metal id="metal2" instrument={metal2} hide={true} />
        <FM id="fm1" instrument={fm1} hide={true} />
        <FM id="fm2" instrument={fm2} hide={true} />
    </div>
    {/if}
</div>

<style>
    .main-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .synth-controls {
        display: flex;
        flex-direction: row;
    }
</style>
