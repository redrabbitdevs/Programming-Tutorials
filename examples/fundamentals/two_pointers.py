def find_pair(sorted_nums, target):
    left = 0
    right = len(sorted_nums) - 1
    while left < right:
        total = sorted_nums[left] + sorted_nums[right]
        if total == target:
            print(f"{sorted_nums[left]} + {sorted_nums[right]} = {target}")
            return
        if total < target:
            left += 1            # need a bigger sum: move the small end up
        else:
            right -= 1           # need a smaller sum: move the large end down
    print(f"no pair adds up to {target}")


nums = [1, 3, 4, 6, 8, 11]
find_pair(nums, 10)
find_pair(nums, 100)
