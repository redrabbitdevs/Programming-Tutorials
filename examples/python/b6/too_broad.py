scores = ["8", "9", "x"]
total = 0
for score in scores:
    try:
        total = totl + int(score)
    except Exception:
        print("skipped", score)
print("Total:", total)
