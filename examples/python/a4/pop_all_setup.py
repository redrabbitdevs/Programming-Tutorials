from contextlib import ExitStack


class Resource:
    def __init__(self, name):
        if name == "broken":
            raise OSError(f"cannot open {name}")
        self.name = name
        print("open", name)

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        print("close", self.name)


class Pool:
    def __init__(self, *names):
        self.names = names

    def __enter__(self):
        with ExitStack() as stack:
            self.items = [stack.enter_context(Resource(name))
                          for name in self.names]
            self._stack = stack.pop_all()
        return self

    def __exit__(self, *exc):
        self._stack.close()


with Pool("db", "cache") as pool:
    print("using", [r.name for r in pool.items])
try:
    with Pool("db", "broken"):
        print("never runs")
except OSError as error:
    print("OSError:", error)
