import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "digits.bin"
    path.write_bytes(b"0123456789")

    with open(path, "rb") as file:
        print(file.read(3), file.tell())
        file.seek(7)
        print(file.read(), file.tell())
        file.seek(0)
        print(file.read(2))
