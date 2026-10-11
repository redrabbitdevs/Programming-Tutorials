RAW = """\
ana,82
ben,67
cleo,91
dev,58
"""


def parse(text):
    scores = {}
    for line in text.splitlines():
        name, score = line.split(",")
        scores[name] = int(score)
    return scores


def average(scores):
    return sum(scores.values()) / len(scores)


def best(scores):
    return max(scores, key=scores.get)


scores = parse(RAW)
print(f"Students: {len(scores)}")
print(f"Average: {average(scores):.1f}")
print(f"Top: {best(scores)}")
