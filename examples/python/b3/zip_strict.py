names = ["Ada", "Grace", "Alan"]
scores = [95, 88, 91]

for name, score in zip(names, scores):
    print(f"{name}: {score}")

short = [1, 2]
for a, b in zip(names, short):
    print(a, b)

try:
    for a, b in zip(names, short, strict=True):
        print(a, b)
except ValueError as error:
    print("ValueError:", error)
