def count_lines(filename):
    try:
        with open(filename, encoding="utf-8") as file:
            return len(file.readlines())
    except FileNotFoundError:
        print("Cannot find", filename)
        return 0


print(count_lines("notes.txt"))
print(count_lines("nothing_here.txt"))
