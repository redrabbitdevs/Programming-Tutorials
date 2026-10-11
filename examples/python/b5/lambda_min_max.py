words = ["banana", "kiwi", "Apple", "cherry"]

print(max(words, key=len))
print(min(words, key=lambda w: w.lower()))
