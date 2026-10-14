from collections import Counter

COLLAPSED = """\
main;load;parse_row 120
main;load;read_file 30
main;report;format_row 40
main;report 10
"""

own, total = Counter(), Counter()
for line in COLLAPSED.splitlines():
    stack, count = line.rsplit(" ", 1)
    frames = stack.split(";")
    own[frames[-1]] += int(count)          # top of the stack is running
    for frame in set(frames):              # every frame on it is waiting
        total[frame] += int(count)

samples = total["main"]
for name, n in total.most_common():
    print(f"{name:10} total {n / samples:4.0%}  own {own[name] / samples:4.0%}")
