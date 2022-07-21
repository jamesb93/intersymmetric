<script>
	import {
		socket,
		params,
		length,
		pitchOffset,
		trackPitch,
		trackShape
	} from '$lib/nobounds/app.js';
	import { freqMap } from '$lib/utility.js';

	export let instrument;
	export let id;

	const trackIdx = id === 'fm1' ? 4 : 5;
	$: instrument.fund.rampTo(
		$params[id].frequency * freqMap($pitchOffset + $trackPitch[trackIdx]),
		0.1
	);
	$: instrument.c1ratio.rampTo($params[id].c1ratio, 0.1);
	$: instrument.c2ratio.rampTo($params[id].c2ratio, 0.1);
	$: instrument.c3ratio.rampTo($params[id].c3ratio, 0.1);
	$: instrument.fm2to1.factor.rampTo($params[id].fm2to1, 0.1);
	$: instrument.fm3to2.factor.rampTo($params[id].fm3to2, 0.1);
	$: instrument.fm3to1.factor.rampTo($params[id].fm3to1, 0.1);
	$: instrument.c1env.release =
		$params[id].c1release * ($length * Math.max($trackShape[trackIdx], 0.01));
	$: instrument.c2env.release =
		$params[id].c2release * ($length * Math.max($trackShape[trackIdx], 0.01));
	$: instrument.c3env.release =
		$params[id].c3release * ($length * Math.max($trackShape[trackIdx], 0.01));
	$: instrument.op1gain.gain.rampTo($params[id].op1gain * 0.33, 0.1);
	$: instrument.op2gain.gain.rampTo($params[id].op2gain * 0.33, 0.1);
	$: instrument.op3gain.gain.rampTo($params[id].op3gain * 0.33, 0.1);

	socket.on('params::' + id + '::frequency', (data) => ($params[id].frequency = data));
	socket.on('params::' + id + '::c1ratio', (data) => ($params[id].c1ratio = data));
	socket.on('params::' + id + '::c2ratio', (data) => ($params[id].c2ratio = data));
	socket.on('params::' + id + '::c3ratio', (data) => ($params[id].c3ratio = data));
	socket.on('params::' + id + '::fm2to1', (data) => ($params[id].fm2to1 = data));
	socket.on('params::' + id + '::fm3to1', (data) => ($params[id].fm3to1 = data));
	socket.on('params::' + id + '::fm3to2', (data) => ($params[id].fm3to2 = data));
	socket.on('params::' + id + '::c1release', (data) => ($params[id].c1release = data));
	socket.on('params::' + id + '::c2release', (data) => ($params[id].c2release = data));
	socket.on('params::' + id + '::c3release', (data) => ($params[id].c3release = data));
	socket.on('params::' + id + '::op1gain', (data) => ($params[id].op1gain = data));
	socket.on('params::' + id + '::op2gain', (data) => ($params[id].op2gain = data));
	socket.on('params::' + id + '::op3gain', (data) => ($params[id].op3gain = data));
</script>
