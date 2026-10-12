from datetime import date, datetime, timedelta

start = datetime(2026, 3, 8, 14, 30)
print(start + timedelta(days=1, hours=2))
print(start - timedelta(minutes=45))

gap = date(2026, 12, 25) - date(2026, 10, 12)
print(gap)
print(gap.days)

length = datetime(2026, 3, 9, 17, 15) - start
print(length)
print(length.total_seconds())
print(length.seconds)
