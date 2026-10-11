for n in range(2, 20):
    for divisor in range(2, n):
        if n % divisor == 0:
            break
    else:
        print(n, end=" ")
print()
