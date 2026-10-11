text = "to be or not to be that is the question"

counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1

for word, n in counts.items():
    if n > 1:
        print(word, n)
