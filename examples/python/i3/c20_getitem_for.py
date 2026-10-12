class Shelf:
    def __init__(self, books):
        self._books = list(books)

    def __getitem__(self, index):
        return self._books[index]


shelf = Shelf(["Dune", "Emma", "Ulysses"])
for book in shelf:
    print(book)
print("Emma" in shelf)
