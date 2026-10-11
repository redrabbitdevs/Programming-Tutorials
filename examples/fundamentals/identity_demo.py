from dataclasses import dataclass


@dataclass
class Book:
    title: str
    year: int


a = Book("Dune", 1965)
b = Book("Dune", 1965)
c = a

print("equal contents:", "yes" if a == b else "no")
print("same object (a, b):", "yes" if a is b else "no")
print("same object (a, c):", "yes" if a is c else "no")

c.year = 1966
print("a.year after changing c:", a.year)
print("b.year:", b.year)
