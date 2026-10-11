def binary_search_count(items, target):
    loops = 0
    low = 0
    high = len(items) - 1
    while low <= high:
        loops += 1
        mid = (low + high) // 2
        if items[mid] == target:
            return loops
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return loops


items = list(range(1000))        # 0, 1, 2, ... 999, already sorted
print("find 499:", binary_search_count(items, 499))
print("find 999:", binary_search_count(items, 999))
print("find 1000 (absent):", binary_search_count(items, 1000))
