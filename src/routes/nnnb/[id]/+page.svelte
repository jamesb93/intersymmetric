<script>
    import { room, socket } from '$lib/nyege/app';
    import { createRoomID } from '$lib/utility';
    import Instance from '$lib/nyege/Instance.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $room = data.id;
    socket.emit('join_room', createRoomID('nnnb', data.id));
</script>

<!-- stuff -->
<Instance />
