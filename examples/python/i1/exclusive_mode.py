import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "report.txt"
    with open(path, "x", encoding="utf-8") as file:
        file.write("version 1\n")

    try:
        open(path, "x", encoding="utf-8")
    except FileExistsError:
        print("refused to overwrite")
    print(path.read_text(encoding="utf-8").strip())
