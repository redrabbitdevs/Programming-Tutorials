def print_largest(nums):
    if len(nums) == 0:
        print("no numbers")
        return
    best = nums[0]
    for n in nums:
        if n > best:
            best = n
    print("largest:", best)


print_largest([3, 9, 4])
print_largest([-5, -2, -8])
print_largest([])
