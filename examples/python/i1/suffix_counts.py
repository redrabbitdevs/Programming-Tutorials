from pathlib import Path

names = ["a.txt", "b.csv", "c.txt", "archive.tar.gz", "README"]
counts = {}
for name in names:
    suffix = Path(name).suffix or "(none)"
    counts[suffix] = counts.get(suffix, 0) + 1

for suffix, count in counts.items():
    print(suffix, count)
