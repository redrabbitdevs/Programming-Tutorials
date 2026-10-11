import json
import tempfile
from pathlib import Path

settings = {"theme": "dark", "sizes": [10, 12], "font": "Café"}

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "settings.json"
    with open(path, "w", encoding="utf-8") as file:
        json.dump(settings, file, indent=2, ensure_ascii=False)

    with open(path, encoding="utf-8") as file:
        loaded = json.load(file)

print(loaded == settings)
