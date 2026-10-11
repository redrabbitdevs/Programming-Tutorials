scores = [88, 95, 70, 91]

ranked = sorted(scores, reverse=True)
print(ranked, scores)

result = scores.sort()
print(result, scores)

words = ["pear", "fig", "banana", "kiwi"]
words.sort(key=len)
print(words)

# Aliasing: two names, one list
a = [1, 2, 3]
b = a
b.append(4)
print(a, b, a is b)

# A copy is a separate list
c = a.copy()
c.append(5)
print(a, c, a is c)

# The shallow-copy trap
grid = [[0, 0], [0, 0]]
shallow = grid.copy()
shallow[0][0] = 9
print(grid)

wrong = [[0] * 2] * 2
wrong[0][0] = 9
print(wrong)
right = [[0] * 2 for _ in range(2)]
right[0][0] = 9
print(right)
