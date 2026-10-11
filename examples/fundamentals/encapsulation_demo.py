class Member:
    MAX_BOOKS = 2

    def __init__(self, name):
        self.name = name
        self._borrowed = []          # internal: use borrow() and give_back()

    def borrow(self, title):
        if len(self._borrowed) >= self.MAX_BOOKS:
            raise ValueError(f"{self.name} already has {self.MAX_BOOKS} books")
        self._borrowed.append(title)

    def give_back(self, title):
        self._borrowed.remove(title)

    def books(self):
        return list(self._borrowed)  # a copy, so callers cannot change ours


ada = Member("Ada")
ada.borrow("Dune")
ada.borrow("Emma")
try:
    ada.borrow("Ulysses")
except ValueError as err:
    print("refused:", err)

ada.give_back("Dune")
ada.borrow("Ulysses")
print("books:", ", ".join(ada.books()))
