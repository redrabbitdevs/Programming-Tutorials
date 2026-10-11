scores = [10, 20, 30, 40]

print("first:", scores[0])
print("last:", scores[len(scores) - 1])
print("length:", len(scores))

scores[1] = 99
print("after change:", scores)

print("slice [1:3]:", scores[1:3])

total = 0
for s in scores:
    total += s
print("total:", total)
