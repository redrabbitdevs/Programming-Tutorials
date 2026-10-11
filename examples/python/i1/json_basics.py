import json

data = {"name": "Ada", "langs": ["Python", "C"], "active": True, "spouse": None, "pair": (1, 2)}

text = json.dumps(data)
print(text)
print(type(text).__name__)

back = json.loads(text)
print(back)
