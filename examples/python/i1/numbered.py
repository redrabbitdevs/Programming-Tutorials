import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    src = Path(folder) / "src.txt"
    dst = Path(folder) / "numbered.txt"
    src.write_text("red\ngreen\nblue\n", encoding="utf-8")

    with open(src, encoding="utf-8") as source, open(dst, "w", encoding="utf-8") as target:
        for number, line in enumerate(source, start=1):
            target.write(f"{number}: {line}")
    print(dst.read_text(encoding="utf-8").splitlines())
