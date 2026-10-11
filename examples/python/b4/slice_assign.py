nums = [0, 1, 2, 3, 4, 5]
nums[1:3] = [10, 20, 30]
print(nums)
nums[::2] = ["w", "x", "y", "z"]
print(nums)
del nums[1:3]
print(nums)
nums[2:2] = ["new"]
print(nums)

try:
    nums[::2] = [1]
except ValueError as error:
    print("ValueError:", error)
