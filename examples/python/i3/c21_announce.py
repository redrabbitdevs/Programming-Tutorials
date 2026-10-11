class Announce:
    def __enter__(self):
        print("enter")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is None:
            print("exit: no error")
        else:
            print("exit:", exc_type.__name__, "-", exc_value)


with Announce():
    print("working")

print("---")

try:
    with Announce():
        raise ValueError("boom")
except ValueError:
    print("the error carried on")
