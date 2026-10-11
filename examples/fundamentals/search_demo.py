def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i
    return -1


def binary_search(items, target):
    low = 0
    high = len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("linear 23:", linear_search(data, 23))
print("linear 7:", linear_search(data, 7))
print("binary 23:", binary_search(data, 23))
print("binary 7:", binary_search(data, 7))
