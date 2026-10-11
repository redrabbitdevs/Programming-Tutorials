class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        return self._items.pop()

    def is_empty(self):
        return not self._items


s = Stack()
s.push(1)
s.push(2)
print(s.pop(), s.pop(), s.is_empty())
print(hasattr(s, "insert"))
