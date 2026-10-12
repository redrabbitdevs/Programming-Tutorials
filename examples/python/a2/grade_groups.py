from collections import Counter, defaultdict

results = [
    ("ana", "B"), ("ben", "A"), ("cy", "B"),
    ("dee", "C"), ("eli", "A"), ("fay", "B"),
]

groups = defaultdict(list)
for name, grade in results:
    groups[grade].append(name)
for grade in sorted(groups):
    print(f"{grade}: {', '.join(groups[grade])}")

counts = Counter(grade for _, grade in results)
grade, n = counts.most_common(1)[0]
print(f"most common: {grade} ({n} of {counts.total()})")
