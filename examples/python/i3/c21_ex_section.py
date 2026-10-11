class Section:
    def __init__(self, title):
        self.title = title

    def __enter__(self):
        print(f"[{self.title}]")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is None:
            print(f"[/{self.title}]")
        else:
            print(f"[/{self.title} failed: {exc_type.__name__}]")
        return False


with Section("load"):
    print("reading")

try:
    with Section("parse"):
        int("x")
except ValueError:
    print("handled")
