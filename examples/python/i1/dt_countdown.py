from datetime import date

today = date(2026, 10, 12)
deadline = date(2026, 12, 25)

left = deadline - today
print(f"{left.days} days left")
print(f"{left.days // 7} weeks and {left.days % 7} days")
print(deadline.strftime("%A"))
