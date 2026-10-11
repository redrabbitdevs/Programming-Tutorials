import tempfile
from pathlib import Path


def copy_in_chunks(source_path, target_path, size):
    chunks = 0
    with open(source_path, "rb") as source:
        with open(target_path, "wb") as target:
            while True:
                chunk = source.read(size)
                if not chunk:
                    break
                target.write(chunk)
                chunks += 1
    return chunks


with tempfile.TemporaryDirectory() as folder:
    original = Path(folder) / "original.bin"
    duplicate = Path(folder) / "duplicate.bin"
    original.write_bytes(bytes(range(10)))
    chunks = copy_in_chunks(original, duplicate, 4)
    print("copied", duplicate.stat().st_size, "bytes in", chunks, "chunks")
    print("identical:", original.read_bytes() == duplicate.read_bytes())
