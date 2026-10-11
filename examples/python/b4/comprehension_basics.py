squares = [n * n for n in range(1, 6)]
print(squares)

evens = [n for n in range(10) if n % 2 == 0]
print(evens)

labels = ["even" if n % 2 == 0 else "odd" for n in range(4)]
print(labels)

words = ["apple", "Bob", "cherry", "Dee"]
print({w: len(w) for w in words})
print(sorted({w[0].lower() for w in words}))

# Same loop, written out
result = []
for n in range(1, 6):
    result.append(n * n)
print(result == squares)

# Two loops in one comprehension: read left to right
pairs = [(x, y) for x in range(3) for y in range(x)]
print(pairs)

# A generator expression computes lazily
total = sum(n * n for n in range(1, 1001))
print(total)
gen = (n * n for n in range(3))
print(next(gen), next(gen), next(gen))

# The loop variable stays inside the comprehension
n = "outer"
_ = [n for n in range(3)]
print(n)
