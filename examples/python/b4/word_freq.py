text = """the quick brown fox jumps over the lazy dog
The dog barks and the fox runs away"""

counts = {}
for word in text.lower().split():
    counts[word] = counts.get(word, 0) + 1

for word in sorted(counts):
    if counts[word] > 1:
        print(word, counts[word])
print(len(counts), "distinct words")
