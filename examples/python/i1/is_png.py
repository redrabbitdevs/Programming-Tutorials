import tempfile
from pathlib import Path

PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"


def is_png(path):
    with open(path, "rb") as file:
        return file.read(8) == PNG_SIGNATURE


with tempfile.TemporaryDirectory() as folder:
    image = Path(folder) / "image.png"
    fake = Path(folder) / "fake.png"
    image.write_bytes(PNG_SIGNATURE + b"...rest of the image...")
    fake.write_bytes(b"hello")
    print(image.name, is_png(image))
    print(fake.name, is_png(fake))
