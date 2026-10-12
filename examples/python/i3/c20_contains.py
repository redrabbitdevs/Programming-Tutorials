class Shelf:
    def __init__(self, books):
        self._books = list(books)

    def __contains__(self, title):
        return title.lower() in [book.lower() for book in self._books]


shelf = Shelf(["Dune", "Emma"])
print("dune" in shelf)
print("Hamlet" in shelf)
print("Hamlet" not in shelf)
