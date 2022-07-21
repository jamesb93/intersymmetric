<script>
    import { users, socket } from "$lib/nobounds/app"

    let name = 'anon';

    const setName = () => {
        socket.send(["name", name]);
    }
</script>

<br>
<input type="text" bind:value={name} />
<button on:click={setName} on:>
    Set Name
</button>

<br>
<br>
You are {name}
<br>

{#each $users as user}
    {user}
    <br>
{/each}

<style>
button {
    border: 1px outset blue;
    background-color: lightBlue;
    cursor:pointer;
}

button:hover {
    background-color: rgb(181, 181, 181);
    color:white;
}
</style>

