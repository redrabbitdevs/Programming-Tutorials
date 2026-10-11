import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "a.txt"
    path.write_text("hello\n", encoding="utf-8")

    try:
        with open(path, encoding="utf-8") as file:
            print("inside:", file.closed)
            raise RuntimeError("boom")
    except RuntimeError:
        print("error caught")
    print("after:", file.closed)
