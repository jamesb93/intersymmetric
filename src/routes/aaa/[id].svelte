<script context="module">
	export async function load({ params }) {
        return { 
            props: {id: params.id}
        };
	}
</script>

<script>
	import { room, socket } from '$lib/aaa/app';
	import { createRoomID } from '$lib/utility';
    import Instance from '$lib/aaa/Instance.svelte';
    export let id;

    $room = id;
    socket.emit('join_room', createRoomID('aaa', id));
</script>

<!-- stuff -->
<Instance />