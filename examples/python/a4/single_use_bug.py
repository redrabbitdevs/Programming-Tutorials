from contextlib import contextmanager


@contextmanager
def section(title):
    print(f"--- {title} ---")
    try:
        yield
    finally:
        print(f"--- end {title} ---")


job = section("job")
try:
    for step in ("load", "save"):
        with job:
            print(step)
except Exception as error:
    print("failed:", type(error).__name__)
