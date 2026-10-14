def count(n, acc=0):
    while n != 0:                         # the tail call, as a loop
        n, acc = n - 1, acc + 1
    return acc


print(count(100_000))
