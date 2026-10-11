import json

data = {1: "one", "pair": (2, 3), "ok": True}
back = json.loads(json.dumps(data))

print(back)
print(back == data)
print(back["pair"] == (2, 3))
