import tempfile
from pathlib import Path


def count_by_extension(folder, counts=None):
    if counts is None:
        counts = {}
    for entry in folder.iterdir():
        if entry.is_dir():
            count_by_extension(entry, counts)
        else:
            counts[entry.suffix] = counts.get(entry.suffix, 0) + 1
    return counts


with tempfile.TemporaryDirectory() as tmp:
    root = Path(tmp) / "project"
    (root / "src" / "pkg").mkdir(parents=True)
    (root / "docs").mkdir()
    for name in ["README.md", "src/main.py", "src/pkg/util.py", "docs/index.md"]:
        (root / name).write_text("x", encoding="utf-8")

    result = count_by_extension(root)
    print(dict(sorted(result.items())))
