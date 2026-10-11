import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    root = Path(folder)
    logs = root / "logs" / "2026"
    logs.mkdir(parents=True, exist_ok=True)
    (logs / "app.log").write_text("a\nb\n", encoding="utf-8")
    (logs / "db.log").write_text("c\n", encoding="utf-8")
    (root / "logs" / "readme.txt").write_text("hi\n", encoding="utf-8")

    print(sorted(p.name for p in (root / "logs").iterdir()))
    print(sorted(p.name for p in root.glob("logs/*.txt")))
    print(sorted(p.relative_to(root).as_posix() for p in root.rglob("*.log")))
