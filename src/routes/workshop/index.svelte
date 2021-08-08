<script>
    // import Landing from '$lib/components/Landing.svelte'
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    onMount(async() => {
        goto('workshop/1')
    })
</script>

<!-- <Landing route='/seq-sample/' /> -->