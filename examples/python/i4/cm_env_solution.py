import os
from contextlib import contextmanager


@contextmanager
def temp_env(name, value):
    old = os.environ.get(name)
    os.environ[name] = value
    try:
        yield
    finally:
        if old is None:
            del os.environ[name]
        else:
            os.environ[name] = old


with temp_env("I4_DEMO_MODE", "debug"):
    print("inside:", os.environ["I4_DEMO_MODE"])
print("after:", os.environ.get("I4_DEMO_MODE"))
