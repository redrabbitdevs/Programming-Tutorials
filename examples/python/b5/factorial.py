def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)


print(factorial(5))
print(factorial(20))
print(factorial(30))


def count_down(n):
    if n == 0:
        print("liftoff")
        return
    print(n)
    count_down(n - 1)


count_down(3)
