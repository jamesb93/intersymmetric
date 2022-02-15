import json
from pathlib import Path

d = {}

presets = {}

jsons = [x for x in Path('.').glob('*_*.json')]

for j in jsons:
    print(j)
    with open(j, 'r') as f:
        d = json.load(f)
        d = d['pattrstorage']['slots']
        presets[j.stem] = []
        for k, v in d.items():
            presets[j.stem].append(v)
        
with open('../presets.json', 'w') as f:
    json.dump(presets, f, indent=2)
