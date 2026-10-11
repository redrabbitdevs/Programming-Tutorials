def parse(text):
    scores = {}
    for line in text.splitlines():
        name, score = line.split(",")
        scores[name] = int(score)
    return scores
