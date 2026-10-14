class Traced:
    def __init__(self):
        self.x = 21

    def __getattribute__(self, name):
        print("looking up", name)
        return object.__getattribute__(self, name)

    def double(self):
        return self.x * 2


t = Traced()
print(t.double())
print(type(t).__name__)
