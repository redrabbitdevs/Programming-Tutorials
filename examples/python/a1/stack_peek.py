class Stack[T]:
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

    def peek(self) -> T | None:
        return self._items[-1] if self._items else None


def drain[T](stack: Stack[T]) -> list[T]:
    out: list[T] = []
    while stack.peek() is not None:
        out.append(stack.pop())
    return out


words = Stack[str]()
for word in ["a", "b", "c"]:
    words.push(word)
print(words.peek(), drain(words), words.peek())
