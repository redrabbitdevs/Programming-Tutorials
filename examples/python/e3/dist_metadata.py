import sys
import tempfile
from importlib.metadata import distributions
from pathlib import Path

# What an installer unpacks from tinyclock-0.1.0-py3-none-any.whl
FILES = {
    "tinyclock-0.1.0.dist-info/METADATA": (
        "Name: tinyclock\nVersion: 0.1.0\n"
        "License-Expression: MIT\nRequires-Python: >=3.11\n"
    ),
    "tinyclock-0.1.0.dist-info/entry_points.txt": (
        "[console_scripts]\ntinyclock = tinyclock.cli:main\n"
    ),
    "tinyclock/__init__.py": "",
    "tinyclock/cli.py": "def main():\n    print('noon')\n",
}

with tempfile.TemporaryDirectory() as site:
    for name, text in FILES.items():
        path = Path(site, name)
        path.parent.mkdir(exist_ok=True)
        path.write_text(text, encoding="utf-8")

    (dist,) = distributions(path=[site])
    print(dist.name, dist.version, dist.metadata["Requires-Python"])
    print("license:", dist.metadata["License-Expression"])
    for script in dist.entry_points.select(group="console_scripts"):
        print(script.name, "->", script.value)
        sys.path.insert(0, site)
        script.load()()
