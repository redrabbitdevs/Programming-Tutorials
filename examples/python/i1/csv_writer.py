import csv
import tempfile
from pathlib import Path

books = [
    {"title": "Dune", "year": 1965},
    {"title": "Good Omens, a novel", "year": 1990},
]

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "out.csv"
    with open(path, "w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=["title", "year"])
        writer.writeheader()
        writer.writerows(books)

    print(path.read_bytes().splitlines())
