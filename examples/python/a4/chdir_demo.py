import tempfile
from contextlib import chdir
from pathlib import Path

start = Path.cwd()
with tempfile.TemporaryDirectory() as tmp:
    with chdir(tmp):
        Path("notes.txt").write_text("hi")
        print(Path.cwd() == Path(tmp).resolve())
        print([p.name for p in Path.cwd().iterdir()])
    print(Path.cwd() == start)
