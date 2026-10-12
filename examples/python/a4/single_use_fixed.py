from contextlib import contextmanager


@contextmanager
def section(title):
    print(f"--- {title} ---")
    try:
        yield
    finally:
        print(f"--- end {title} ---")


for step in ("load", "save"):
    with section("job"):
        print(step)
