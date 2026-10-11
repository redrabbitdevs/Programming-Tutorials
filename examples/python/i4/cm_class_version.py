class Announce:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print("enter", self.name)

    def __exit__(self, exc_type, exc_value, traceback):
        print("exit", self.name)
        return False


with Announce("job"):
    print("working")
