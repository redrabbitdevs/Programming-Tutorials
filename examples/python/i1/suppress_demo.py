import tempfile
from contextlib import suppress
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "cache.txt"

    with suppress(FileNotFoundError):
        path.unlink()
    print("no error, even though the file never existed")

    path.write_text("x", encoding="utf-8")
    with suppress(FileNotFoundError):
        path.unlink()
    print("exists after delete:", path.exists())
