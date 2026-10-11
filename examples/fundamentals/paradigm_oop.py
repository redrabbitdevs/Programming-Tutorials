class EvenSquares:
    def __init__(self, numbers):
        self.numbers = numbers

    def total(self):
        result = 0
        for n in self.numbers:
            if n % 2 == 0:
                result += n * n
        return result


report = EvenSquares([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print("total:", report.total())
