import RNBO from '@rnbo/js';


interface Sample {
    url: string;
    buffer: string;
}

const sendDeviceMessage = (device: RNBO.Device, tag: string, message: any[]): void => {
    try {
        device.scheduleEvent(new RNBO.MessageEvent(RNBO.TimeNow, tag, message));
    } catch (e) {
        throw new Error('RNBO device likely is invalid or has not been loaded yet');
    }
};

const loadSamples = async (
    patch: RNBO.Device,
    context: AudioContext,
    samples: Sample[]
): Promise<void[]> => {
    return Promise.all(
        samples.map((sample) => {
            return fetch(sample.url)
                .then((response) => response.arrayBuffer())
                .then((buffer) => context.decodeAudioData(buffer))
                .then((audioBuf) => patch.setDataBuffer(sample.buffer, audioBuf));
        })
    );
};

const createDeviceInstance = (
    devicePath: string,
    context: AudioContext,
    output: AudioNode
): Promise<RNBO.Device> => {
    return new Promise((resolve, reject) => {
        fetch(devicePath)
            .then((response) => response.json())
            .then((response) => {
                const patcher = response;
                return RNBO.createDevice({ context, patcher });
            })
            .then((device) => {
                device.node.connect(output);
                device.messageEvent.subscribe((e: RNBO.MessageEvent) => {
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
