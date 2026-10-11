words = ["the", "cat", "and", "the", "hat"]

counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1

for w, n in counts.items():
    print(f"{w}: {n}")
