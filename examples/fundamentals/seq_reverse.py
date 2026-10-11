def reverse_in_place(items):
    n = len(items)
    for i in range(n // 2):
        items[i], items[n - 1 - i] = items[n - 1 - i], items[i]


nums = [1, 2, 3, 4, 5]
reverse_in_place(nums)
print(nums)

evens = [1, 2, 3, 4]
reverse_in_place(evens)
print(evens)
