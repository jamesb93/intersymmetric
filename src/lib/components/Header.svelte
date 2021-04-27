<script>
    import { numUsers } from "./stores.js";
	import RoomPrompt from "./RoomPrompt.svelte";
	import Editor from "./Editor.svelte";

</script>

<header>
    <div id="title">
        <span>Intersymmetric Works</span>
        <br>
        <span>Grid Sequencer 01</span>
    </div>
    <RoomPrompt />
    <div>
        <span>Users:</span>
        <br>
        <span>{$numUsers}</span>
    </div>
    <Editor />
</header>

<div class="line"></div>

<style>
    header {
        padding-top: 12px;
        padding-bottom: 12px;
        max-width: 50%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 10px;
    }

    .line {
        border-bottom: 2px solid #59a245;
        width: 100%;
    }
</style>