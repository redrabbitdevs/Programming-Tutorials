from pathlib import Path

p = Path("data") / "raw" / "2026.tar.gz"
print(p.name)
print(p.stem)
print(p.suffix)
print(p.with_suffix(".zip"))
print(p.parent.name)
