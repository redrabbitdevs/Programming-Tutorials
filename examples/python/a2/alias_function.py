def add_bonus(scores):
    scores.append(10)
    return scores


mine = [70, 80]
theirs = add_bonus(mine)
print(mine, theirs is mine)


def reset(scores):
    scores = []
    return scores


fresh = reset(mine)
print(mine, fresh)
