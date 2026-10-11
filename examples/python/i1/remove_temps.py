import tempfile
from contextlib import suppress
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    root = Path(folder)
    (root / "a.tmp").write_text("1", encoding="utf-8")
    (root / "c.tmp").write_text("3", encoding="utf-8")

    removed = 0
    for name in ["a.tmp", "b.tmp", "c.tmp"]:
        with suppress(FileNotFoundError):
            (root / name).unlink()
            removed += 1

    print("removed", removed)
    print("left:", len(list(root.iterdir())))
