class Basket:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)


mon = Basket()
tue = Basket()
mon.add("apple")
print(tue.items)
