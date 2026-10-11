import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "lines.txt"
    path.write_bytes(b"one\r\ntwo\r\n")

    print(repr(path.read_text(encoding="utf-8")))
    with open(path, encoding="utf-8", newline="") as file:
        print(repr(file.read()))

    with open(path, "w", encoding="utf-8", newline="\n") as file:
        file.write("a\nb\n")
    print(path.read_bytes())
