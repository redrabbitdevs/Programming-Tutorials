import tomllib

TEXT = """
debug = true

[server]
host = "0.0.0.0"
port = 8080
"""

config = tomllib.loads(TEXT)
server = config["server"]
print(f"Listening on {server['host']}:{server['port']}")
print("Debug mode:", "on" if config["debug"] else "off")
