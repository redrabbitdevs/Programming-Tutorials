for n in range(1, 10):
    if n % 2 == 0:
        continue
    if n > 7:
        break
    print("odd and at most 7:", n)
