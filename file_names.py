from pathlib import Path
import json
src = Path("static/rewire_samples/compressed")
samples = [f'/rewire_samples/compressed/{str(x.name)}' for x in src.rglob("*.mp3")]

d = {
    "samples" : samples
}

with open("static/sampleList.json", 'w') as f:
    json.dump(d, f, indent=4)
