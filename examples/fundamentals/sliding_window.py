def best_window_sum(nums, k):
    window = 0
    for i in range(k):
        window += nums[i]                  # the first window, added up once
    best = window
    for i in range(k, len(nums)):
        window += nums[i]                  # one value enters on the right
        window -= nums[i - k]              # one value leaves on the left
        if window > best:
            best = window
    return best


print("best sum of 3:", best_window_sum([2, 1, 5, 1, 3, 2, 9, 1], 3))
print("best sum of 2:", best_window_sum([4, -1, -2, 5], 2))
