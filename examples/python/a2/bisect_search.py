from bisect import bisect_left, bisect_right, insort

scores = [10, 20, 20, 30]
print(bisect_left(scores, 20), bisect_right(scores, 20))
insort(scores, 25)
print(scores)


def contains(items, x):
    i = bisect_left(items, x)
    return i < len(items) and items[i] == x


print(contains(scores, 25), contains(scores, 26))


def grade(score, breakpoints=(60, 70, 80, 90), grades="FDCBA"):
    return grades[bisect_right(breakpoints, score)]


print([grade(s) for s in [33, 60, 77, 89, 90, 100]])
