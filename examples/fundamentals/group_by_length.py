words = ["a", "bb", "cc", "d", "eee"]

by_length = {}
for w in words:
    by_length.setdefault(len(w), []).append(w)

for length, group in by_length.items():
    print(length, "[" + ", ".join(group) + "]")
