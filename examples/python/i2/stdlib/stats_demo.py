import random
import statistics

scores = [70, 85, 90, 85, 60, 95]
print(statistics.mean(scores))
print(statistics.median(scores))
print(statistics.mode(scores))
print(round(statistics.stdev(scores), 2))

random.seed(11)
first = random.sample(range(100), 3)
random.seed(11)
print(first == random.sample(range(100), 3))
