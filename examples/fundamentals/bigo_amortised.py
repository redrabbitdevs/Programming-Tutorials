def copies_for(appends):
    capacity = 1
    size = 0
    copies = 0
    for _ in range(appends):
        if size == capacity:
            copies += size       # moving everything to a bigger block
            capacity *= 2
        size += 1
    return copies


for appends in [10, 100, 1000]:
    print(f"appends={appends} copies={copies_for(appends)}")
