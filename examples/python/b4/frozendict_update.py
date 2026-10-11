config = frozendict(host="localhost", port=8080)
print(isinstance(config, dict))

updated = frozendict({**config, "port": 9090})
print(updated)
print(config)
