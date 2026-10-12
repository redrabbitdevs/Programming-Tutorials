class Shout:
    def __get__(self, obj, objtype=None):
        return "SHOUT"


class Word:
    text = Shout()

    @property
    def size(self):
        return 3


w = Word()
print(w.text)
w.text = "quiet"
print(w.text)
try:
    w.size = 10
except AttributeError as error:
    print("AttributeError:", error)
print(w.size)
