import RNBO from '@rnbo/js';

const send_message = (patch, key, data) => {
	if (patch && RNBO) {
		patch.scheduleEvent(new RNBO.MessageEvent(RNBO.TimeNow, key, data));
	}
};

export { send_message };
