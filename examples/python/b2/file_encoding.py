import tempfile
from pathlib import Path

path = Path(tempfile.gettempdir()) / "unicode_lesson_note.txt"
path.write_text("naïve café\n", encoding="utf-8")
print(path.read_text(encoding="utf-8").strip())
print(path.stat().st_size)
path.unlink()
