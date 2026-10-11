with open("notes.txt", encoding="utf-8") as file:
    for number, line in enumerate(file, start=1):
        print(number, line.rstrip("\n"))
