from collections import Counter

COLLAPSED = """\
main;handle;query_db 300
main;handle;render;escape 150
main;handle;render 50
main;handle 100
main;log 400
"""

own, total = Counter(), Counter()
for line in COLLAPSED.splitlines():
    stack, count = line.rsplit(" ", 1)
    frames = stack.split(";")
    own[frames[-1]] += int(count)
    for frame in set(frames):
        total[frame] += int(count)

print("most own samples:", own.most_common(1)[0][0])
print("widest below main:", [n for n, _ in total.most_common()][1])
print("handle own share:", f"{own['handle'] / total['main']:.0%}")
