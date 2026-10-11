from contextlib import contextmanager


@contextmanager
def announce(name):
    print("enter", name)
    try:
        yield
    finally:
        print("exit", name)


try:
    with announce("job"):
        print("working")
        raise ValueError("boom")
except ValueError as error:
    print("caught", error)
