<script>
    import { room } from '$lib/nobounds/firebase-core';
    import Instance from '$lib/nobounds/Instance.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $room = data.id;
</script>

<Instance />
