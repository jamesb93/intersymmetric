<script>
  import { socket } from '$lib/nobounds/app';
  export let value;
  export let id = '';
  let internalValue = '';

  socket.on('velocityList', (identifier, value) => {
    if (id === identifier) {
      internalValue = value;
    }
  });

  function send() {
    socket.emit('velocityList', id, internalValue);
  }

  $: t = internalValue.split(' ');
  $: value = t.filter(d => parseFloat(d) === parseFloat(d)); // check if it can be numerable
  $: value = value.length === 0 ? ['1.0'] : value;
</script>

<input type="text" bind:value={internalValue} on:change={send} />

<style>
  input {
    width: 100%;
  }
</style>
