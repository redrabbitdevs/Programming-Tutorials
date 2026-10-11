from itertools import groupby

words = ["apple", "avocado", "banana", "blueberry", "cherry", "apricot"]

for letter, group in groupby(words, key=lambda w: w[0]):
    print(letter, list(group))

print("sorted first:")
for letter, group in groupby(sorted(words), key=lambda w: w[0]):
    print(letter, list(group))
