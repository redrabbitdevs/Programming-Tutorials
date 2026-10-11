import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "greeting.txt"
    path.write_text("café\n", encoding="utf-8")

    raw = path.read_bytes()
    print(raw)
    print(len(raw))
    print(repr(raw.decode("utf-8")))
