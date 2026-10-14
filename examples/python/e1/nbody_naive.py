import random

random.seed(11)
BODIES = [[random.uniform(-1, 1), random.uniform(-1, 1), 1.0, 0.0, 0.0]
          for _ in range(100)]                  # x, y, mass, vx, vy
pairs_done = 0


def step(bodies, dt=0.01):
    global pairs_done
    for i in range(len(bodies)):
        for j in range(len(bodies)):
            if i == j:
                continue
            pairs_done += 1
            dx = bodies[j][0] - bodies[i][0]
            dy = bodies[j][1] - bodies[i][1]
            dist = (dx ** 2 + dy ** 2 + 0.01) ** 0.5
            bodies[i][3] += dx * bodies[j][2] / dist ** 3 * dt
            bodies[i][4] += dy * bodies[j][2] / dist ** 3 * dt
    for b in bodies:
        b[0] += b[3] * dt
        b[1] += b[4] * dt
