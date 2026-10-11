import tempfile
import tomllib
from pathlib import Path

TEXT = """
title = "Demo"

[server]
port = 8080
hosts = ["a", "b"]
"""

print(tomllib.loads(TEXT))

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "config.toml"
    path.write_text(TEXT, encoding="utf-8")
    with open(path, "rb") as file:
        config = tomllib.load(file)

print(config["server"]["port"])
