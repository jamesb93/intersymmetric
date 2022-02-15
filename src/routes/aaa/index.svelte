<script>
    import RNBO from '@rnbo/js';

    import presets from '../../../static/aaa/presets.json';
    console.log(presets)

    let ctx, d, patcher, context;
    let samplesLoaded = false;
    let pattern = [0, 0, 0];

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
                samplesLoaded = true;
            })
            .catch(err => { console.error(err) })
    }

    function sendMessage(time, key, data) {
        if (d && RNBO) {
            d.scheduleEvent( new RNBO.MessageEvent(time, key, data) );
        }
    }

    function masterPreset(num) {
        const now = RNBO.TimeNow;
        for (const [k, v] of Object.entries(presets)) {
            try { 
                const parameters = v[num].data
                for (const [k, v] of Object.entries(parameters)) {
                    sendMessage(now, String(k), v)
                }
            } catch {
                console.log('lol')
            }
        }
    }

    function init() {
        masterPreset(0)
    }

    let speed = 1;
    let fm1_listener = 0,
        fm2_listener = 0,
        perc_listener = 0,
        master_preset = 0

    $: masterPreset(master_preset);
    $: sendMessage(RNBO.TimeNow, 'speed', speed);
    $: sendMessage(RNBO.TimeNow, 'fm1_listener', fm1_listener);
    $: sendMessage(RNBO.TimeNow, 'fm2_listener', fm2_listener);
    $: sendMessage(RNBO.TimeNow, 'perc_listener', perc_listener);
</script>

<input type="range" min={0.05} max={10} step={0.01} bind:value={speed} />
<input type="number" bind:value={master_preset} />

<label>
    fm1_listener
    <input type=range min={0} max={3} steps={4} bind:value={fm1_listener} />
</label>

<label>
    fm2_listener
    <input type=range min={0} max={3} steps={4} bind:value={fm2_listener} />
</label>

<label>
    perc_listener
    <input type=range min={0} max={3} steps={4} bind:value={perc_listener} />
</label>

<p>
    {#each pattern as p }
        { p }
    {/each}
</p>

<p>{ samplesLoaded }</p>


<div class="top">
    <button on:click={start} disabled={d}>start</button>
</div>

<button on:click={ () => { 
    init();
    sendMessage(RNBO.TimeNow, 'state', [1]);
}}>go</button>

<a href='https://www.dropbox.com/sh/w7uso18978mbcu5/AAA9g_0PD4BaO-L1rnbvHb2Ha?dl=0'>presets</a>