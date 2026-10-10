def factorial(n):
    if n <= 1:
        return 1                 # base case
    return n * factorial(n - 1)  # recursive case


print("5! =", factorial(5))
