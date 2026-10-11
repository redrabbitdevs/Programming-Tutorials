letters = ["a", "b", "c", "d", "e", "f"]

print(letters[1:4])
print(letters[:2], letters[4:])
print(letters[-2:], letters[:-2])
print(letters[::2])
print(letters[::-1])
print(letters[4:1:-1])
print(letters[10:20])

text = "Python"
print(text[1:4], text[::-1])
print((10, 20, 30, 40)[1:3])

# A slice is a copy
copy = letters[:]
copy[0] = "z"
print(letters[0], copy[0])

# slice objects can be named
middle = slice(1, -1)
print(letters[middle])
