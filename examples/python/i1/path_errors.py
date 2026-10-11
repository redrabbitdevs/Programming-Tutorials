import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    target = Path(folder) / "reports"
    target.mkdir()
    try:
        target.mkdir()
    except FileExistsError:
        print("already exists")
    try:
        (target / "missing.txt").read_text(encoding="utf-8")
    except FileNotFoundError as error:
        print(type(error).__name__)
