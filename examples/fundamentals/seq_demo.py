nums = [3, 1, 2]

nums.append(4)           # in place: nums is now [3, 1, 2, 4]
nums.sort()              # in place: returns None, not the list
print(nums)

ordered = sorted([3, 1, 2])  # builds a new list; the original is untouched
print(ordered)
