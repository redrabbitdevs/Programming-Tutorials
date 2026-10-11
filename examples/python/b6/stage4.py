def top_words(counts, n):
    ranked = sorted(counts.items(), key=lambda item: (-item[1], item[0]))
    return ranked[:n]


counts = {"cat": 3, "dog": 3, "the": 9, "mat": 2, "sat": 2, "log": 1}
for word, count in top_words(counts, 4):
    print(f"{word:<6}{count:>3}")
