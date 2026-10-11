for n in range(24, 29):
    for divisor in range(2, n):
        if n % divisor == 0:
            break
    else:
        print("first prime:", n)
        break
else:
    print("no primes from 24 to 28")
