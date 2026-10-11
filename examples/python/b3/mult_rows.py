for row in range(1, 4):
    line = ""
    for col in range(1, 6):
        line += f"{row * col:3}"
    print(line)
