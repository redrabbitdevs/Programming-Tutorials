from pathlib import Path

here = Path(__file__).resolve().parent
print(here.is_dir())
print((here / "script_dir.py").exists())
