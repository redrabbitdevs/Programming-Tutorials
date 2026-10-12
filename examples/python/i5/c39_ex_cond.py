import io
import os
import pdb


def running_total(numbers):
    total = 0
    for i, n in enumerate(numbers):
        total += n
    return total


commands = """\
break 9, i == 3
continue
p i, n, total
display total
next
next
continue
"""

out = io.StringIO()
debugger = pdb.Pdb(stdin=io.StringIO(commands), stdout=out)
result = debugger.runcall(running_total, [5, 10, 15, 20, 25])

print(out.getvalue().replace(os.getcwd() + os.sep, ""))
print("returned", result)
