import csv
import tempfile
from pathlib import Path

SAMPLE = """title,author,year
Dune,Frank Herbert,1965
"Good Omens, a novel",Pratchett & Gaiman,1990
"""

with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "books.csv"
    path.write_text(SAMPLE, encoding="utf-8")

    with open(path, encoding="utf-8", newline="") as file:
        rows = list(csv.DictReader(file))

print(rows[0])
print(rows[1]["title"])
print(sum(int(row["year"]) for row in rows) / len(rows))
