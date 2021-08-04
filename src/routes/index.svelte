<script>
    import BoxButton from '$lib/components/BoxButton.svelte';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';

    function handleButton() {
        // THIS LINK POINTS TO THE CURRENT THING
        goto('/seq-1/idx')
    }

</script>

<div class='container' transition:fade>
    <span>Performances:</span>
    <div class='times'>
        <span>13/08 21:00 BST | Modern Institute</span>
        <span>19/08 21:00 BST | Ewa Justke</span>
        <span>26/08 21:00 BST | Beatrice Dillon</span>
        <span>31/08 21:00 BST | Nyege Nyege</span>
    </div>

    <div class='info'> 
        Instructions Go Here
    </div>

    <BoxButton text='Join' func={ handleButton } />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        max-width: 100%;
        justify-content: center;
        align-items: center;
        text-align: left;
        min-height: 100vh;
        gap: 20px;
    }

    .times{
        display: flex;
        flex-direction: column;
    }

</style>