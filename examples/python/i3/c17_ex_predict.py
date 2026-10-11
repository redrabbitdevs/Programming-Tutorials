class Box:
    def __init__(self, side):
        self.side = side

    @property
    def volume(self):
        return self.side**3


b = Box(2)
print(b.volume)
b.side = 3
print(b.volume)
try:
    b.volume = 100
except AttributeError:
    print("read-only")
print(b.volume)
