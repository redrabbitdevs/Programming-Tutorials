import json

data = {"city": "Zürich", "b": 1, "a": [2, 3]}

print(json.dumps(data))
print(json.dumps(data, indent=2, sort_keys=True, ensure_ascii=False))
