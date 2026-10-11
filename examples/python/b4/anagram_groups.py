words = ["listen", "silent", "enlist", "google", "gogole", "cat", "act"]

groups = {}
for word in words:
    key = tuple(sorted(word))
    groups.setdefault(key, []).append(word)

for group in groups.values():
    print(group)
