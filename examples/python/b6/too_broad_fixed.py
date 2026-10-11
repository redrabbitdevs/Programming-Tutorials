scores = ["8", "9", "x"]
total = 0
for score in scores:
    try:
        value = int(score)
    except ValueError:
        print("skipped", score)
    else:
        total = total + value
print("Total:", total)
