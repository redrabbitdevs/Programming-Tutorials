import tempfile
from pathlib import Path


def read_text_either(path):
    raw = path.read_bytes()
    try:
        return raw.decode("utf-8")
    except UnicodeDecodeError:
        return raw.decode("latin-1")


with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "name.txt"
    path.write_bytes("Zoë\n".encode("latin-1"))
    print(read_text_either(path).strip())
    path.write_bytes("Zoë\n".encode("utf-8"))
    print(read_text_either(path).strip())
