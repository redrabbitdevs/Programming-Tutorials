import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "a.txt"
    path.write_text("hello\n", encoding="utf-8")

    file = open(path, encoding="utf-8")
    try:
        text = file.read()
    finally:
        file.close()
    print(repr(text), file.closed)
