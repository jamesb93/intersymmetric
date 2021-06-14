<script>
    import { goto } from '$app/navigation';
    import { browser } from '$app/env';

    if (browser) {
        goto('/seq-1');
    }
</script>