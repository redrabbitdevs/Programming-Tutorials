from itertools import groupby

for key, group in groupby("aabaa"):
    print(key, len(list(group)))
