import RNBO from '@rnbo/js';

const send_message = (patch, key, data) => {
	if (patch && RNBO) {
		patch.scheduleEvent(new RNBO.MessageEvent(RNBO.TimeNow, key, data));
	}
};

const load_samples = async (patch, context, numsamples, prefix, asset_path, offset) => {
	let samples = new Array(numsamples).fill(0).map((x, i) => ({
		buffer: `${prefix}${i+offset}`,
		path: `${asset_path}${i}.mp3`
	}));
	return Promise.all(
		samples.map((sample) => {
			// return load_sample(patch, context, sample.buffer, sample.path);
			return fetch(sample.path)
			.then((response) => response.arrayBuffer())
			.then((buffer) => context.decodeAudioData(buffer))
			.then((audioBuf) => patch.setDataBuffer(sample.buffer, audioBuf));
		})
	);
};

export { send_message, load_samples };
