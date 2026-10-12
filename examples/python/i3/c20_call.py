class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor


triple = Multiplier(3)
print(triple(14))
print(callable(triple))
print(list(map(triple, [1, 2, 3])))
