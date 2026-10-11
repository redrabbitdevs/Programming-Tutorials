import statistics
from datetime import date

marks = [70, 85, 90, 85, 60]
print(statistics.mean(marks), statistics.median(marks))

release = date(2026, 10, 9)
print(release.strftime("%A"))
print((date(2026, 12, 25) - release).days)
