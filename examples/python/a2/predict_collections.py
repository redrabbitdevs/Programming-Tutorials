from collections import Counter, defaultdict

seen = defaultdict(int)
for word in ["a", "b", "a"]:
    seen[word] += 1
if seen["c"] == 0:
    print("no c")
print(len(seen))
print(Counter(a=2) - Counter(a=5, b=1))
