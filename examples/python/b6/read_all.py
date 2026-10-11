with open("notes.txt", encoding="utf-8") as file:
    text = file.read()

print(text)
print(len(text), "characters")
print(repr(text[:12]))
