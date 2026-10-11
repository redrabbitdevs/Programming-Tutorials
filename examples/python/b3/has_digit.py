word = "route66"

for character in word:
    if character.isdigit():
        print("has a digit")
        break
else:
    print("no digits")
