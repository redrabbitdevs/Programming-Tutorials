word = "cat"
# word[0] = "b"        # TypeError: strings do not support item assignment
word = "b" + word[1:]
print(word)
