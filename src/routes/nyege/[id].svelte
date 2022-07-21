<script context="module">
	export async function load({ params }) {
        return { 
            props: {id: params.id}
        };
	}
</script>

<script>
	import { room, socket } from '$lib/nyege/app';
	import { createRoomID } from '$lib/utility';
    import Instance from '$lib/nyege/Instance.svelte';
    export let id;

    $room = id;
    socket.emit('join_room', createRoomID('nyege', id));
</script>

<!-- stuff -->
<Instance />