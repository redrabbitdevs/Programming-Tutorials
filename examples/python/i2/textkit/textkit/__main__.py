import sys

from .formats.table import render

text = " ".join(sys.argv[1:]) or "the cat and the hat and the bat"
print(render(text, 3))
