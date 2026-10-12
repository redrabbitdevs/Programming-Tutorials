import copy

config = {"name": "app", "servers": ["a", "b"]}
copies = [copy.copy(config), dict(config), config.copy(), {**config}]

copies[0]["name"] = "changed"
copies[1]["servers"].append("c")
print(config)
print(all(c["servers"] is config["servers"] for c in copies))
