words = ["banana", "Apple", "cherry", "apple", "Banana"]

print(sorted(words))
print(sorted(words, key=str.casefold))
print(sorted(words, key=len))
print(sorted(words, key=len, reverse=True))
print(words)

copy = words.copy()
result = copy.sort(key=str.casefold)
print(result, copy)
