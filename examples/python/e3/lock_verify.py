import hashlib
import tempfile
import tomllib
from pathlib import Path

WHEEL = b"pretend these are the bytes of a wheel"
DIGEST = hashlib.sha256(WHEEL).hexdigest()
LOCK = f"""\
lock-version = "1.0"
created-by = "lesson"

[[packages]]
name = "tinyclock"
version = "0.1.0"

[[packages.wheels]]
path = "tinyclock-0.1.0-py3-none-any.whl"

[packages.wheels.hashes]
sha256 = "{DIGEST}"
"""


def verify(lock_text, folder):
    lock = tomllib.loads(lock_text)
    for package in lock["packages"]:
        for wheel in package["wheels"]:
            data = Path(folder, wheel["path"]).read_bytes()
            actual = hashlib.sha256(data).hexdigest()
            ok = actual == wheel["hashes"]["sha256"]
            print(package["name"], package["version"],
                  "ok" if ok else "MISMATCH")


with tempfile.TemporaryDirectory() as folder:
    wheel_file = Path(folder, "tinyclock-0.1.0-py3-none-any.whl")
    wheel_file.write_bytes(WHEEL)
    verify(LOCK, folder)
    wheel_file.write_bytes(WHEEL + b" and a backdoor")
    verify(LOCK, folder)
