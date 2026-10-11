text = """the quick brown fox jumps over the lazy dog
The dog barks and the fox runs away"""

counts = {}
for word in text.lower().split():
    counts[word] = counts.get(word, 0) + 1

by_count = sorted(counts.items(), key=lambda pair: (-pair[1], pair[0]))
for word, count in by_count[:4]:
    print(f"{word:6} {count}")
print(len(counts), "distinct words")
