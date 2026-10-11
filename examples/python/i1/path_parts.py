from pathlib import Path

path = Path("reports") / "2026" / "summary.final.txt"
print(path)
print(path.name)
print(path.stem)
print(path.suffix)
print(path.parent)
print(path.parts)
print(path.with_suffix(".csv"))
print(path.with_name("notes.txt"))
