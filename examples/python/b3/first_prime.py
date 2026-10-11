for n in range(90, 120):
    for divisor in range(2, n):
        if n % divisor == 0:
            break
    else:
        print("first prime:", n)
        break
else:
    print("none found")
