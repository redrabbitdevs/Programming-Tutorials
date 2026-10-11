import os
import tempfile
from contextlib import contextmanager
from pathlib import Path


@contextmanager
def working_directory(path):
    """Change the working directory, and always change back."""
    previous = Path.cwd()
    os.chdir(path)
    try:
        yield Path.cwd()
    finally:
        os.chdir(previous)


start = Path.cwd()
with tempfile.TemporaryDirectory() as folder:
    with working_directory(folder) as here:
        Path("note.txt").write_text("hi", encoding="utf-8")
        print("inside:", here.samefile(folder), sorted(p.name for p in Path.cwd().iterdir()))
    print("back:", Path.cwd() == start)
