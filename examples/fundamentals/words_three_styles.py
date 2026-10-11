words = ["tree", "apple", "fig", "banana", "kiwi"]

# Imperative: a loop and an accumulator.
total = 0
for word in words:
    if len(word) > 3:
        total += len(word)
print("imperative:", total)


# Object-oriented: the data and the question live together.
class WordList:
    def __init__(self, words):
        self.words = words

    def long_letters(self):
        total = 0
        for word in self.words:
            if len(word) > 3:
                total += len(word)
        return total


print("object:", WordList(words).long_letters())


# Functional: filter, map, sum; nothing is modified.
def is_long(word):
    return len(word) > 3


print("functional:", sum(map(len, filter(is_long, words))))
