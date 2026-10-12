import copy

config = {"name": "app", "servers": ["a", "b"]}
deep = copy.deepcopy(config)
deep["servers"].append("c")
print(config["servers"], deep["servers"])

shared = [1, 2]
pair = [shared, shared]
clone = copy.deepcopy(pair)
print(clone[0] is clone[1], clone[0] is shared)

loop = [1]
loop.append(loop)
print(copy.deepcopy(loop))
