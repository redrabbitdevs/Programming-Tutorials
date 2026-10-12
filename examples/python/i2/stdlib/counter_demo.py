from collections import Counter

votes = ["tea", "coffee", "tea", "juice", "tea", "coffee"]

counts = Counter(votes)
print(counts)
print(counts["tea"], counts["water"])
print(counts.most_common(2))
