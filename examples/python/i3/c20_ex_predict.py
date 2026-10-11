class Tag:
    def __init__(self, label):
        self.label = label

    def __eq__(self, other):
        return self.label == other.label

    def __hash__(self):
        return hash(self.label)


a = Tag("py")
b = Tag("py")
print(a is b)
print(a == b)
print(len({a, b}))
