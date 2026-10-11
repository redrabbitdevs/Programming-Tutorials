def sum_of_even_squares(numbers):
    total = 0
    for n in numbers:
        if n % 2 == 0:
            total += n * n
    return total


print(sum_of_even_squares([1, 2, 3, 4]))
print(sum_of_even_squares([]))
