class Shelf:
    def __init__(self, books):
        self._books = list(books)

    def __getitem__(self, index):
        return self._books[index]


shelf = Shelf(["Dune", "Emma", "Ulysses"])
print(shelf[0])
print(shelf[-1])
print(shelf[0:2])
