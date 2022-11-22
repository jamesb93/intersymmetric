<script>
    import { room } from '$lib/nyege/app';
    import Instance from '$lib/nyege/Instance.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    $room = data.id;
</script>

<!-- stuff -->
<Instance />
