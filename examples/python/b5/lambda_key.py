words = ["banana", "kiwi", "Apple", "cherry"]

print(sorted(words))
print(sorted(words, key=len))
print(sorted(words, key=str.lower))
print(sorted(words, key=lambda w: w[-1]))
