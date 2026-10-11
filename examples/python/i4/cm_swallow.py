from contextlib import contextmanager


@contextmanager
def ignore_missing_keys():
    try:
        yield
    except KeyError as error:
        print("ignored missing key", error)


settings = {"theme": "dark"}
with ignore_missing_keys():
    print(settings["theme"])
    print(settings["font"])
    print("not reached")
print("carried on")
