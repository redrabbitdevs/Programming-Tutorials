import tomllib
from pathlib import Path

with Path("pyproject.toml").open("rb") as f:
    config = tomllib.load(f)

project = config["project"]
print(project["name"], project["version"])
print("needs Python", project["requires-python"])
print("dependencies:", project["dependencies"])
print("commands:", list(project["scripts"]))
print("build backend:", config["build-system"]["build-backend"])
print("dev group:", config["dependency-groups"]["dev"])
