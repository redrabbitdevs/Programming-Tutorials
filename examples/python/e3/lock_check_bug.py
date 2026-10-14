import hashlib
import tempfile
from pathlib import Path

WHEEL = b"pretend these are the bytes of a wheel"
NAME = "tinyclock-0.1.0-py3-none-any.whl"
LOCK = {NAME: hashlib.sha256(WHEEL).hexdigest()}


def check(path):
    expected = LOCK.get(str(path))
    if expected is None:
        return "ok (no hash recorded)"
    actual = hashlib.sha256(path.read_bytes()).hexdigest()
    return "ok" if actual == expected else "MISMATCH"


with tempfile.TemporaryDirectory() as folder:
    wheel = Path(folder, NAME)
    wheel.write_bytes(WHEEL)
    print(check(wheel))
    wheel.write_bytes(WHEEL + b" and a backdoor")
    print(check(wheel))
