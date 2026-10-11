import tempfile
from contextlib import ExitStack
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    paths = [Path(folder) / f"part{n}.txt" for n in (1, 2, 3)]
    for n, path in enumerate(paths, start=1):
        path.write_text(f"part {n}\n", encoding="utf-8")

    with ExitStack() as stack:
        files = [stack.enter_context(open(p, encoding="utf-8")) for p in paths]
        merged = "".join(file.read() for file in files)

    print(merged.splitlines())
    print([file.closed for file in files])
