<script>
    let active = false;
    export const blink = () => {
        active = true;
        setTimeout(() => {
            active = false;
        }, 50);
    };
</script>

<div class="container">
    <div class='blip' class:active />
</div>

<style>
    div.container {
        display: grid;
        place-items: center;
    }
    .blip {
        border: 2px solid var(--primary);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: background-color 50ms ease-in-out;
    }
    .active {
        background-color: var(--primary);
    }
</style>
