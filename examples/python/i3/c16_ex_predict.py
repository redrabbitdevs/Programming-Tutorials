class TallyCounter:
    total = 0

    def __init__(self):
        self.count = 0

    def hit(self):
        self.count = self.count + 1
        TallyCounter.total = TallyCounter.total + 1


a = TallyCounter()
b = TallyCounter()
a.hit()
a.hit()
b.hit()
print(a.count, b.count, TallyCounter.total)
print(a.total)
