<script>
    import { room } from '$lib/seq-2/app';
    import Instance from '$lib/seq-2/Instance.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $room = data.id;
</script>

<Instance />
