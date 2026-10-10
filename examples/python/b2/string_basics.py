single = 'It is'
double = "It's"
triple = """Line one
Line two"""
print(single, double)
print(triple)
print("Tab:\tdone")
print("C:\new")
print(r"C:\new")
print("ab" "cd")

word = "Python"
print(word[0], word[-1])
print(word[1:4], word[:2], word[4:])
print(word[::-1])
print(len(word), "th" in word)
print("ha" * 3 + "!")
try:
    word[0] = "J"
except TypeError as error:
    print(error)
print("J" + word[1:])
