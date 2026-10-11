n = 6
while n != 1:
    print(f"{n=}")
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
print("reached", n)
