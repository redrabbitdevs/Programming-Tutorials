"""Drive pdb from a list of commands, so the session can be checked automatically.

At the keyboard you would type the commands yourself. Here they are fed in as a
string and the output is captured, with the folder name removed.
"""

import io
import os
import pdb


def total_with_tax(prices, rate):
    total = 0
    for price in prices:
        total += price
    return total * 1 + rate


commands = """\
break 16
continue
p total
p rate
p total * 1 + rate
p total * (1 + rate)
continue
"""

out = io.StringIO()
debugger = pdb.Pdb(stdin=io.StringIO(commands), stdout=out)
result = debugger.runcall(total_with_tax, [10, 20], 0.1)

text = out.getvalue().replace(os.getcwd() + os.sep, "")
print(text)
print("returned", result)
