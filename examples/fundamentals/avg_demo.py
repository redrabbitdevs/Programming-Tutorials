def print_average(nums):
    if len(nums) == 0:
        print("no numbers")
        return
    total = 0
    for n in nums:
        total += n
    print("average:", total // len(nums))


print_average([4, 8, 6])
print_average([1, 2])
print_average([])
