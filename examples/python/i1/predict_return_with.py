import tempfile
from pathlib import Path


def read_first(path):
    with open(path, encoding="utf-8") as file:
        line = file.readline().strip()
        return line, file.closed


with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "greeting.txt"
    path.write_text("hello\nworld\n", encoding="utf-8")
    print(read_first(path))
