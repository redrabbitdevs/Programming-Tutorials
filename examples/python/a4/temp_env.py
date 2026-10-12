import os
from contextlib import contextmanager


@contextmanager
def temp_env(**changes):
    saved = {name: os.environ.get(name) for name in changes}
    try:
        for name, value in changes.items():
            if value is None:
                os.environ.pop(name, None)
            else:
                os.environ[name] = value
        yield
    finally:
        for name, value in saved.items():
            if value is None:
                os.environ.pop(name, None)
            else:
                os.environ[name] = value


os.environ["MODE"] = "prod"
os.environ.pop("DEBUG", None)
with temp_env(MODE="test", DEBUG="1"):
    print(os.environ["MODE"], os.environ["DEBUG"])
print(os.environ["MODE"], "DEBUG" in os.environ)
try:
    with temp_env(MODE=None):
        print("MODE" in os.environ)
        raise RuntimeError("boom")
except RuntimeError:
    pass
print(os.environ["MODE"])
