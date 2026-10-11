import random

roll = random.randint(1, 6)
print(1 <= roll <= 6)

colour = random.choice(["red", "green", "blue"])
print(colour in ["red", "green", "blue"])

cards = [1, 2, 3, 4, 5]
random.shuffle(cards)
print(sorted(cards))

picked = random.sample(range(1, 50), 6)
print(len(picked), len(set(picked)))

random.seed(5)
first = [random.randint(1, 6) for _ in range(5)]
random.seed(5)
second = [random.randint(1, 6) for _ in range(5)]
print(first == second)
