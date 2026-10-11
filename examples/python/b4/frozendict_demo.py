config = frozendict(host="localhost", port=8080)
print(config)
print(config["port"], config.get("debug", False))
