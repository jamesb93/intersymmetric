<script>
    let active = false;
    export const blink = () => {
        active = true;
        setTimeout(() => {
            active = false;
        }, 50);
    };
</script>

<div class:active />

<style>
    div {
        border: 1px solid var(--primary);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transition: background-color 50ms ease-in-out;
    }
    .active {
        background-color: var(--primary);
    }
</style>
