import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    scratch = Path(folder)
    (scratch / "x.txt").write_text("x", encoding="utf-8")
    print("inside:", scratch.exists(), len(list(scratch.iterdir())), "file")
print("after:", scratch.exists())
