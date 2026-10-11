words = ["pear", "fig", "banana", "kiwi", "apple"]
print(sorted(words, key=lambda w: (len(w), w)))
