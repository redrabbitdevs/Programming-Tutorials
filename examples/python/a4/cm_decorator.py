from contextlib import contextmanager


@contextmanager
def section(title):
    print(f"--- {title} ---")
    try:
        yield
    finally:
        print(f"--- end {title} ---")


@section("report")
def report(orders):
    print(orders, "orders")


report(2)
report(5)


@section("numbers")
def numbers():
    yield 1
    yield 2


for n in numbers():
    print(n)
