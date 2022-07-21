<script>
	import { socket, params, length, pitchOffset, trackPitch, trackShape } from '$lib/nobounds/app';
	import { kick } from '$lib/nobounds/instruments/ensemble.js';
	import { freqMap, clip } from '$lib/utility.js';

	$: kick.membrane.octaves = clip($params.kick.octaves, 0, 999);
	$: kick.membrane.envelope.attack = Math.max(
		$params.kick.attack * $length * Math.max($trackShape[0], 0.01),
		0
	);
	$: kick.membrane.envelope.sustain = clip($params.kick.sustain, 0.0, 1.0);

	$: kick.membrane.envelope.decay = Math.max(
		$params.kick.decay * $length * Math.max($trackShape[0], 0.01),
		0
	);
	$: kick.membrane.envelope.release = Math.max(
		$params.kick.release * $length * Math.max($trackShape[0], 0.01),
		0
	);
	$: kick.distortion.distortion = clip($params.kick.distortion, 0.0, 1.0);

	$: {
		let calculatedFreq = Math.max(
			0,
			$params.kick.frequency * freqMap($pitchOffset + $trackPitch[0])
		);
		if (!Number.isNaN(calculatedFreq) && Math.sign(calculatedFreq) === 1) {
			kick.membrane.frequency.rampTo(calculatedFreq, 0.1);
		}
	}

	socket.on('params::kick::distortion', (data) => {
		$params.kick.distortion = data;
	});
	socket.on('params::kick::frequency', (data) => {
		$params.kick.frequency = data;
	});
	socket.on('params::kick::octaves', (data) => {
		$params.kick.octaves = data;
	});
	socket.on('params::kick::attack', (data) => {
		$params.kick.attack = data;
	});
	socket.on('params::kick::decay', (data) => {
		$params.kick.decay = data;
	});
	socket.on('params::kick::release', (data) => {
		$params.kick.release = data;
	});
	socket.on('params::kick::sustain', (data) => {
		$params.kick.sustain = data;
	});
</script>
