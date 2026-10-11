def insertion_sort(items):
    for i in range(1, len(items)):
        current = items[i]
        j = i - 1
        while j >= 0 and items[j] > current:
            items[j + 1] = items[j]      # shift the bigger value right
            j -= 1
        items[j + 1] = current           # drop current into the gap
        print(items)


data = [5, 2, 9, 1, 5, 6]
insertion_sort(data)
print("sorted:", data)
