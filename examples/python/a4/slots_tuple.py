class Pair(tuple):
    __slots__ = ("label",)

    def __new__(cls, a, b, label):
        self = super().__new__(cls, (a, b))
        self.label = label
        return self


pair = Pair(1, 2, "origin")
print(pair, pair.label, len(pair))
