entries = ["4", "x", "10", "2.5", "7"]
total = 0
skipped = 0
for entry in entries:
    try:
        number = int(entry)
    except ValueError:
        skipped += 1
    else:
        total += number

print("Total:", total)
print("Skipped:", skipped)
