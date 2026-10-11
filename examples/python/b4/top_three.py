def top_three(scores):
    return sorted(scores, reverse=True)[:3]


scores = [72, 95, 88, 64, 95, 81]
print(top_three(scores))
print(scores)
print(top_three([50, 40]))
