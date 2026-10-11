for i in range(1, 4):
    for j in range(1, 4):
        if j == 2:
            continue
        if i == 3:
            break
        print(i, j)
