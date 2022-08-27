<script>
    import { room, socket } from '$lib/aaa/app';
    import { createRoomID } from '$lib/utility';
    import Instance from '$lib/aaa/Instance.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $room = data.id;
    socket.emit('join_room', createRoomID('aaa', data.id));
</script>

<!-- stuff -->
<Instance />
