import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    source_path = Path(folder) / "source.bin"
    target_path = Path(folder) / "copy.bin"
    source_path.write_bytes(bytes(range(10)))

    with open(source_path, "rb") as source:
        with open(target_path, "wb") as target:
            while True:
                chunk = source.read(4)
                if not chunk:
                    break
                print("chunk of", len(chunk), "bytes")
                target.write(chunk)

    print(target_path.read_bytes() == source_path.read_bytes())
