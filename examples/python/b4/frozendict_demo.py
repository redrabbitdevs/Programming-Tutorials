config = frozendict(host="localhost", port=8080)
print(config)
print(config["port"], config.get("debug", False))

try:
    config["port"] = 9090
except TypeError as error:
    print("TypeError:", error)

# Order does not affect equality or hashing
other = frozendict(port=8080, host="localhost")
print(config == other, hash(config) == hash(other))

# Hashable, so it can be a dict key or a set member
cache = {config: "connection #1"}
print(cache[other])

# Not a dict subclass
print(isinstance(config, dict))

# "Changing" means building a new one
updated = frozendict({**config, "port": 9090})
print(updated, config)
