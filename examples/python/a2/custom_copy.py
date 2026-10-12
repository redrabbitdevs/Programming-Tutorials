import copy
from itertools import count

next_id = count(1)


class Document:
    def __init__(self, text):
        self.id = next(next_id)
        self.text = text

    def __copy__(self):
        return Document(self.text)


first = Document("draft")
second = copy.copy(first)
print(first.id, second.id, second.text)
