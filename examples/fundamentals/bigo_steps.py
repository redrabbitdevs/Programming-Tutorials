def linear_steps(n):
    steps = 0
    for _ in range(n):
        steps += 1
    return steps


def halving_steps(n):
    steps = 0
    while n > 0:
        n = n // 2
        steps += 1
    return steps


def pair_steps(n):
    steps = 0
    for i in range(n):
        for j in range(i + 1, n):
            steps += 1
    return steps


for n in [10, 100, 1000]:
    print(f"n={n} linear={linear_steps(n)} halving={halving_steps(n)} pairs={pair_steps(n)}")
