class Step:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print("enter", self.name)
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("exit", self.name)
        return False


try:
    with Step("outer"):
        with Step("inner"):
            print("body")
            raise RuntimeError("stop")
except RuntimeError:
    print("caught")
