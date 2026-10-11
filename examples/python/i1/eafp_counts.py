words = ["tea", "milk", "tea"]

counts = {}
for word in words:
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1
print("look first:", counts)

counts = {}
for word in words:
    try:
        counts[word] += 1
    except KeyError:
        counts[word] = 1
print("ask forgiveness:", counts)
