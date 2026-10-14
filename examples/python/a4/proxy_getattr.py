class Recorder:
    def __init__(self, target):
        self._target = target
        self.calls = []

    def __getattr__(self, name):
        self.calls.append(name)
        return getattr(self._target, name)


words = Recorder(["b", "a"])
words.append("c")
words.sort()
print(words._target, words.calls)
try:
    words.missing
except AttributeError as error:
    print("AttributeError:", error)
try:
    len(words)
except TypeError as error:
    print("TypeError:", error)
