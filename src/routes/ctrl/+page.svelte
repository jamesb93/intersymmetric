<script>
  import '../../ctrl.css';
  import { io } from 'socket.io-client';
  import Slider from '$lib/aaa/Slider.svelte';

  const socketAddr = import.meta.env.PROD ? 'wss://ctrl.intersymmetric.xyz:48000' : 'ws://localhost:48000';
  const socket = io(socketAddr);
  socket.on('connect', () => {
    console.log('connected to CTRL websocket');
  });

  let slider0 = 0.5;
  let slider1 = 0.5;
  let slider2 = 0.5;
  let slider3 = 0.5;

  socket.on('slider0', (x) => (slider0 = x));
  socket.on('slider1', (x) => (slider1 = x));
  socket.on('slider2', (x) => (slider2 = x));
  socket.on('slider3', (x) => (slider3 = x));

  const sliderConfig = { min: 0, max: 1, step: 0.01, thumb_height: 2, bar_height: 450 };
</script>

<div class="container">
  <Slider {...sliderConfig} bind:value={slider0} func={() => socket.emit('slider0', slider0)} />
  <Slider {...sliderConfig} bind:value={slider1} func={() => socket.emit('slider1', slider1)} />
  <Slider {...sliderConfig} bind:value={slider2} func={() => socket.emit('slider2', slider2)} />
  <Slider {...sliderConfig} bind:value={slider3} func={() => socket.emit('slider3', slider3)} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.5em;
    margin-top: 5em;
    user-select: none;
    -webkit-user-drag: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>
