<script>
    let active = false;
    const blink = () => {
        active = true;
        setTimeout(() => {
            active = false
        }, 100)
    }
</script>

<div class:active={active}></div>

<style>
    div {
        border: 1px solid var(--primary);
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
    .active {
        background-color: var(--primary);
    }
</style>