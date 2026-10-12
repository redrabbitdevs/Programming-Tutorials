from collections import deque


class RecentFiles:
    def __init__(self, size):
        self._items = deque(maxlen=size)

    def open(self, name):
        if name in self._items:
            self._items.remove(name)
        self._items.appendleft(name)

    def items(self):
        return list(self._items)


recent = RecentFiles(3)
for name in ["a.py", "b.py", "c.py", "a.py", "d.py", "e.py"]:
    recent.open(name)
    print(recent.items())
