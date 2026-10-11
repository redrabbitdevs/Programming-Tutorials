import csv
import json
import tempfile
from pathlib import Path

SAMPLE = """title,author,year,price
Dune,Frank Herbert,1965,9.99
"Good Omens, a novel",Pratchett & Gaiman,1990,7.5
"""

with tempfile.TemporaryDirectory() as folder:
    source = Path(folder) / "books.csv"
    target = Path(folder) / "books.json"
    source.write_text(SAMPLE, encoding="utf-8")

    with open(source, encoding="utf-8", newline="") as file:
        books = list(csv.DictReader(file))
    for book in books:
        book["year"] = int(book["year"])
        book["price"] = float(book["price"])

    with open(target, "w", encoding="utf-8") as file:
        json.dump(books, file, indent=2)

    print(target.read_text(encoding="utf-8"))
