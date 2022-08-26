<script>
  import { socket, params, length, pitchOffset, trackPitch, trackShape } from '$lib/nobounds/app.js';
  import { clip, freqMap } from '$lib/utility.js';
  import { snare } from '$lib/nobounds/instruments/ensemble.js';

  $: snare.filter.frequency.rampTo($params.snare.frequency * freqMap($pitchOffset + $trackPitch[1]), 0.1);
  $: snare.env.attack = $params.snare.attack * $length * $trackShape[1];
  $: snare.env.decay = $params.snare.decay * $length * $trackShape[1];
  $: snare.env.release = $params.snare.release * $length * $trackShape[1];
  $: snare.env.sustain = $params.snare.sustain;
  $: snare.membrane.frequency.rampTo($params.snare.membraneFreq * freqMap($pitchOffset), 0.1);
  $: snare.waveshaper.order = clip(Math.round($params.snare.order), 1, 100);

  socket.on('params::snare::attack', data => ($params.snare.attack = data));
  socket.on('params::snare::decay', data => ($params.snare.decay = data));
  socket.on('params::snare::sustain', data => ($params.snare.sustain = data));
  socket.on('params::snare::release', data => ($params.snare.release = data));
  socket.on('params::snare::order', data => ($params.snare.order = data));
  socket.on('params::snare::membraneFreq', data => ($params.snare.membraneFreq = data));
  socket.on('params::snare::frequency', data => ($params.snare.frequency = data));
</script>
