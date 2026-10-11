def doubling_steps(n):
    steps = 0
    i = 1
    while i < n:
        i *= 2
        steps += 1
    return steps


print("n=1:", doubling_steps(1))
print("n=1000:", doubling_steps(1000))
print("n=1024:", doubling_steps(1024))
print("n=1025:", doubling_steps(1025))
