import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "data.bin"
    with open(path, "wb") as file:
        file.write(bytes([137, 80, 78, 71]))
        file.write(b"\r\n")

    with open(path, "rb") as file:
        header = file.read(4)
    print(header, list(header), header == b"\x89PNG")
