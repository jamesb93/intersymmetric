import RNBO from '@rnbo/js';

const sendMessage = (patch, key, data) => {
    if (patch && RNBO) {
        patch.scheduleEvent(new RNBO.MessageEvent(RNBO.TimeNow, key, data));
    }
};

const loadSamples = async(patch, context, numsamples, prefix, asset_path, offset) => {
    let samples = new Array(numsamples).fill(0).map((x, i) => ({
        buffer: `${prefix}${i + offset}`,
        path: `${asset_path}${i}.mp3`
    }));
    return Promise.all(
        samples.map(sample => {
            return fetch(sample.path)
            .then(response => response.arrayBuffer())
            .then(buffer => context.decodeAudioData(buffer))
            .then(audioBuf => patch.setDataBuffer(sample.buffer, audioBuf));
        })
    );
};
    
/**
* Creates an instance of an RNBO patcher
* @constructor
* @param {string} patch - Path to a JSON export of an RNBO patch 
* @param {string} context - Audio context
* @param {string} output - An output node in the audio context
*/
const createInstance = (patch, context, output) => {
    return new Promise((resolve, reject) => {
        fetch(patch)
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
                resolve(device)
            } else {
                reject('Error')
            }
        })
    })

}

export { sendMessage, loadSamples, createInstance };
    