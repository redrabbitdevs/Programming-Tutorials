def make_multiplier(factor):
    def multiply(n):
        return n * factor

    return multiply


triple = make_multiplier(3)
print(triple(14))
print(callable(triple), callable(42))
