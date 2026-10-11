config = frozendict(host="localhost", port=8080)
other = frozendict(port=8080, host="localhost")
print(config == other, hash(config) == hash(other))

cache = {config: "connection #1"}
print(cache[other])
