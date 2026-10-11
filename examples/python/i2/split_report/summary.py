def average(scores):
    return sum(scores.values()) / len(scores)


def best(scores):
    return max(scores, key=scores.get)
