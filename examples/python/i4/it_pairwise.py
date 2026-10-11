from itertools import pairwise

temps = [18, 21, 20, 25]
print(list(pairwise(temps)))
print([b - a for a, b in pairwise(temps)])

# Works on any iterable, including a string:
print(["".join(p) for p in pairwise("abcd")])
