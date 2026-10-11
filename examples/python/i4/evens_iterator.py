class Evens:
    """Yield the even numbers from 0 up to, but not including, limit."""

    def __init__(self, limit):
        self.limit = limit
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.limit:
            raise StopIteration
        value = self.current
        self.current += 2
        return value


for n in Evens(7):
    print(n, end=" ")
print()

evens = Evens(5)
print(list(evens))
print(list(evens))
