from dataclasses import dataclass


@dataclass
class Book:
    title: str
    author: str
    year: int
    available: bool = True

    def describe(self):
        status = "available" if self.available else "on loan"
        return f"{self.title} by {self.author} ({self.year}) - {status}"

    def lend(self):
        self.available = False


dune = Book("Dune", "Frank Herbert", 1965)
print(dune.describe())
dune.lend()
print(dune.describe())
