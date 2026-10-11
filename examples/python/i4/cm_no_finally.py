from contextlib import contextmanager


@contextmanager
def announce(name):
    print("enter", name)
    yield
    print("exit", name)


try:
    with announce("job"):
        raise ValueError("boom")
except ValueError:
    print("caught")
