import os

from temp_env import temp_env

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
