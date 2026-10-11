class Counter:
    total = 0

    def __init__(self):
        self.count = 0

    def hit(self):
        self.count = self.count + 1
        Counter.total = Counter.total + 1


a = Counter()
b = Counter()
a.hit()
a.hit()
b.hit()
print(a.count, b.count, Counter.total)
print(a.total)
