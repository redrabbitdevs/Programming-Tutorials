import copy
import timeit

import nbody_naive


def step_fast(bodies, dt=0.01):
    n, pairs = len(bodies), 0
    for i in range(n):
        xi, yi, mi = bodies[i][0], bodies[i][1], bodies[i][2]
        for j in range(i + 1, n):              # each pair once
            bj = bodies[j]
            dx, dy = bj[0] - xi, bj[1] - yi
            d2 = dx * dx + dy * dy + 0.01
            k = dt / (d2 * d2 ** 0.5)          # dt / dist**3
            bodies[i][3] += dx * bj[2] * k
            bodies[i][4] += dy * bj[2] * k
            bj[3] -= dx * mi * k               # equal and opposite
            bj[4] -= dy * mi * k
            pairs += 1
    for b in bodies:
        b[0] += b[3] * dt
        b[1] += b[4] * dt
    return pairs


a = copy.deepcopy(nbody_naive.BODIES)
b = copy.deepcopy(nbody_naive.BODIES)
nbody_naive.step(a)
pairs = step_fast(b)
close = all(abs(p - q) < 1e-9 for ra, rb in zip(a, b)
            for p, q in zip(ra, rb))
print("pairs:", nbody_naive.pairs_done, "->", pairs)
print("same state (within 1e-9):", close)

slow = min(timeit.repeat(lambda: nbody_naive.step(a), number=5, repeat=3))
fast = min(timeit.repeat(lambda: step_fast(b), number=5, repeat=3))
print("faster:", fast < slow)
