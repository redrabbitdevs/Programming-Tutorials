import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    note = Path(folder) / "note.txt"
    print(note.exists())
    note.write_text("first line\nsecond line\n", encoding="utf-8")
    print(note.exists(), note.is_file(), note.stat().st_size)
    print(note.read_text(encoding="utf-8").splitlines())
    note.unlink()
    print(note.exists())
