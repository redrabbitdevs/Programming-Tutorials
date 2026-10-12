import io
import os
import pdb


def running_total(numbers):
    total = 0
    for i, n in enumerate(numbers):
        total += n
    return total


commands = """\
tbreak 9, n > 12
continue
p i, n, total
continue
"""

out = io.StringIO()
debugger = pdb.Pdb(stdin=io.StringIO(commands), stdout=out)
result = debugger.runcall(running_total, [5, 10, 15, 20, 25])

print(out.getvalue().replace(os.getcwd() + os.sep, ""))
print("returned", result)
