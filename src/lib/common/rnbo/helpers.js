import RNBO from '@rnbo/js';

/**
 * A helper for sending an RNBO device a message through an inport.
 * @param  { RNBO.Device } device -- An existing RNBO device
 * @param  { String } tag -- The tag of the inport
 * @param  { Array.<any> } message -- The message to send via the inport
 */
const sendDeviceMessage = (device, tag, message) => {
    try {
        device.scheduleEvent(new RNBO.MessageEvent(RNBO.TimeNow, tag, message));
    } catch (e) {
        throw new Error('RNBO device likely is invalid or has not been loaded yet');
    }
};

/**
 * A function to load samples into buffers in an RNBO device.
 * @param  { RNBO.Device } patch
 * @param  { AudioContext } context
 * @param  { Array.<{url: String, buffer: String}> } samples
 * @example <caption>Loading two kick samples into RNBO buffers</caption>
 * let context: an audio context you've already created
 * let patch; some patch that has been loaded already
 * const samples = [
 *    { url: '/audio/808 Kick.wav', buffer: 'sf1' },
 *    { url: '/audio/909 Kick.wav', buffer: 'sf2' },
 * ]
 * loadSamples(patch, context, samples)
 */
const loadSamples = async (patch, context, samples) => {
    return Promise.all(
        samples.map(sample => {
            return fetch(sample.url)
                .then(response => response.arrayBuffer())
                .then(buffer => context.decodeAudioData(buffer))
                .then(audioBuf => patch.setDataBuffer(sample.buffer, audioBuf));
        })
    );
};

/**
 * Creates an instance of an RNBO patcher. Known as a "device".
 * @constructor
 * @param { String } devicePath - Path to a JSON export of an RNBO patch
 * @param { AudioContext } context - Audio context
 * @param { GainNode } output - An output node in the audio context
 */
const createDeviceInstance = (devicePath, context, output) => {
    return new Promise((resolve, reject) => {
        fetch(devicePath)
            .then(response => response.json())
            .then(response => {
                const patcher = response;
                return RNBO.createDevice({ context, patcher });
            })
            .then(device => {
                device.node.connect(output);
                device.messageEvent.subscribe(e => {
                    if (e.tag.includes('debug')) {
                        console.log(e.tag, e.payload);
                    }
                });
                if (device) {
                    resolve(device);
                } else {
                    reject('Error');
                }
            });
    });
};

export { sendDeviceMessage, loadSamples, createDeviceInstance };