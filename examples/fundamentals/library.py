class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.available = True

    def __repr__(self):
        return f"Book({self.title!r})"


class Member:
    MAX_BOOKS = 2

    def __init__(self, name):
        self.name = name
        self._borrowed = []

    def borrow(self, book):
        if not book.available:
            raise ValueError(f"{book.title!r} is already on loan")
        if len(self._borrowed) >= self.MAX_BOOKS:
            raise ValueError(f"{self.name} already has {self.MAX_BOOKS} books")
        book.available = False
        self._borrowed.append(book)

    def give_back(self, book):
        self._borrowed.remove(book)
        book.available = True

    def books(self):
        return list(self._borrowed)


dune = Book("Dune", "Frank Herbert")
emma = Book("Emma", "Jane Austen")
ulysses = Book("Ulysses", "James Joyce")
ada = Member("Ada")
grace = Member("Grace")

ada.borrow(dune)
ada.borrow(emma)
for member, book in [(ada, ulysses), (grace, dune)]:
    try:
        member.borrow(book)
    except ValueError as err:
        print("refused:", err)

ada.give_back(dune)
grace.borrow(dune)
print(ada.books(), grace.books())
