import tempfile
from pathlib import Path

files = {
    "app.log": "start\nwork\nstop\n",
    "db.log": "open\nclose\n",
    "notes.txt": "ignore me\n",
    "old/web.log": "x\ny\nz\nw\n",
}

with tempfile.TemporaryDirectory() as folder:
    root = Path(folder)
    for name, text in files.items():
        path = root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")

    total = 0
    for path in sorted(root.rglob("*.log")):
        count = len(path.read_text(encoding="utf-8").splitlines())
        print(f"{path.relative_to(root).as_posix()}: {count}")
        total += count
    print("Total:", total)
