def is_prime(n):
    if n < 2:
        return False
    for divisor in range(2, int(n**0.5) + 1):
        if n % divisor == 0:
            return False
    return True


def report_first_prime(numbers):
    for n in numbers:
        if is_prime(n):
            print("first prime:", n)
            break
    else:
        print("no primes in", numbers)


report_first_prime([4, 6, 9, 11, 13])
report_first_prime([4, 6, 8, 10])
