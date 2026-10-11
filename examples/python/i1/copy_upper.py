import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    src = Path(folder) / "names.txt"
    dst = Path(folder) / "names_upper.txt"
    src.write_text("alpha\nbeta\ngamma\n", encoding="utf-8")

    with (
        open(src, encoding="utf-8") as source,
        open(dst, "w", encoding="utf-8") as target,
    ):
        for line in source:
            target.write(line.upper())

    print(dst.read_text(encoding="utf-8").splitlines())
