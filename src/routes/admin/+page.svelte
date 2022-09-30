<script>
	import { socket } from '$lib/nyege/app';

	let state = {};

	socket.emit('dump', null)
	socket.on('dump', x => console.log(x))

</script>
