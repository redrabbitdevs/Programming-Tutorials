import shutil
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as tmp:
    work = Path(tmp)
    source = work / "notes.txt"
    source.write_text("remember the milk\n", encoding="utf-8")

    shutil.copy(source, work / "copy.txt")
    print(sorted(p.name for p in work.iterdir()))

    archive = shutil.make_archive(str(work / "backup"), "zip", root_dir=work)
    print(Path(archive).name)

    shutil.move(work / "copy.txt", work / "renamed.txt")
    print(sorted(p.name for p in work.iterdir()))

print(work.exists())
