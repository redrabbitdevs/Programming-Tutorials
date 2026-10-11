import math
import shutil
import statistics
import subprocess
import sys
import tempfile
import textwrap
from pathlib import Path

# 1. Ways to choose 3 books from 10
print(math.comb(10, 3))

# 2. Greatest common divisor of 84 and 36
print(math.gcd(84, 36))

# 3. Median of an unsorted list
print(statistics.median([7, 1, 5, 3, 9, 2]))

# 4. Wrap a sentence at 20 characters
print(textwrap.fill("The quick brown fox jumps over the lazy dog", width=20))

# 5. Run a child Python process and capture its output
child = subprocess.run(
    [sys.executable, "-c", "print('child')"], capture_output=True, text=True
)
print(child.stdout.strip())

# 6. Copy a file into a new folder and compare sizes
with tempfile.TemporaryDirectory() as tmp:
    source = Path(tmp) / "a.txt"
    source.write_text("hello\n", encoding="utf-8")
    target = Path(tmp) / "backup"
    target.mkdir()
    copied = shutil.copy(source, target)
    print(source.stat().st_size == Path(copied).stat().st_size)
