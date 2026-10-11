nums = [3, 1, 2]

nums.append(4)           # in place: nums is now [3, 1, 2, 4]
nums.sort()              # in place: returns None, not the list
print(nums)

ordered = sorted([3, 1, 2])  # builds a new list; the original is untouched
print(ordered)

wrong = nums.sort()      # a classic mistake: sort() returns None
print(wrong)

# Slicing copies. The copy and the original are separate lists.
original = [1, 2, 3, 4, 5]
middle = original[1:4]
middle[0] = 99
print(original, middle)

# Negative indexes count from the end in Python.
print(original[-1], original[-2])

# Looping with the position as well as the value.
for i, value in enumerate(["a", "b", "c"]):
    print(i, value)
