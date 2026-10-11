words = ["the", "cat", "and", "the", "hat", "and", "the", "bat"]

counts = {}
for word in words:
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1

for word, n in counts.items():
    print(f"{word}: {n}")

print("has 'cat':", "yes" if "cat" in counts else "no")
print("has 'dog':", "yes" if "dog" in counts else "no")
print("count of 'hat':", counts["hat"])
