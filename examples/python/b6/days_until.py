from datetime import date

start = date(2026, 10, 9)
end = date(2027, 1, 1)
days = (end - start).days
print("Days:", days)
print("Weeks and days:", days // 7, days % 7)
