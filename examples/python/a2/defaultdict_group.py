from collections import defaultdict

words = ["ant", "ape", "bee", "cow"]

by_letter = defaultdict(list)
for word in words:
    by_letter[word[0]].append(word)
print(by_letter)
print(dict(by_letter))

print(by_letter.get("q"), len(by_letter))
print(by_letter["z"])
print("z" in by_letter, len(by_letter))
