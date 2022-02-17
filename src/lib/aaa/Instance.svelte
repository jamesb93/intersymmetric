<script>
    import RNBO from '@rnbo/js';
    import Interface from './interface/Interface.svelte';

    let ctx, d, patcher, context;
    let samples_loaded = false;

    function loadSample(buffer, path) {
        return fetch(path)
            .then(response => response.arrayBuffer())
            .then(buffer => context.decodeAudioData(buffer))
            .then(audioBuf => {
                d.setDataBuffer(buffer, audioBuf)
            })
    }

    async function loadAllSamples() {
        let samples = new Array(46).fill(0).map((x, i) => {
            return {
                buffer : `buf${i}`,
                path: `/aaa/samples/${i}.mp3`
            }
        })
        return Promise.all(samples.map(sample => {
            return loadSample(sample.buffer, sample.path);
        }));
    }

    const start = () => {
        ctx = window.AudioContext || window.webkitAudioContext;
        context = new ctx();
        let outputNode = context.createGain();
        outputNode.connect(context.destination);
        
        fetch("/aaa/code/patch.export.json")
            .then(response => response.json())
            
            .then(response => {
                patcher = response;
                return RNBO.createDevice({context, patcher});
            })
            
            .then(device => {
                device.node.connect(outputNode);
                d = device;

                device.messageEvent.subscribe(e => {
                    console.log(e.tag, e.payload);
                    if (e.tag === 'pattern') {
                        pattern = e.payload
                    }
                })

                loadAllSamples();
            })
            .then(x => { 
                samples_loaded = true;
            })
            .catch(err => { console.error(err) })
    }
</script>


<Interface bind:patch={d} />
<button on:click={start} disabled={d}>start</button>

<!-- <a href='https://www.dropbox.com/sh/w7uso18978mbcu5/AAA9g_0PD4BaO-L1rnbvHb2Ha?dl=0'>presets</a> -->