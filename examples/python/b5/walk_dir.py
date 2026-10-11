import shutil
import tempfile
from pathlib import Path


def walk(folder, depth=0):
    """Print a folder tree and return the number of files in it."""
    count = 0
    for entry in sorted(folder.iterdir(), key=lambda p: p.name.lower()):
        suffix = "/" if entry.is_dir() else ""
        print("  " * depth + entry.name + suffix)
        if entry.is_dir():
            count += walk(entry, depth + 1)
        else:
            count += 1
    return count


tmp = tempfile.mkdtemp()
root = Path(tmp) / "project"
(root / "src" / "pkg").mkdir(parents=True)
(root / "docs").mkdir()
for name in ["README.md", "src/main.py", "src/pkg/util.py", "docs/index.md"]:
    (root / name).write_text("x", encoding="utf-8")

print(root.name + "/")
files = walk(root, 1)
print("files:", files)

shutil.rmtree(tmp)
