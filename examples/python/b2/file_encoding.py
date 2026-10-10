from pathlib import Path
import tempfile

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "note.txt"
    path.write_text("naïve café\n", encoding="utf-8")
    print(path.read_text(encoding="utf-8").strip())
    print(path.stat().st_size)
