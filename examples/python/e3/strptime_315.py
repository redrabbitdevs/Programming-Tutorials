from datetime import datetime

birthday = "03-14"
try:
    datetime.strptime(birthday, "%m-%d")
except ValueError as error:
    print("ValueError:", str(error).split(".")[0])

# Say which year you mean, and the leap-day problem goes away.
print(datetime.strptime(f"2026-{birthday}", "%Y-%m-%d").date())
print(datetime.strptime("2028-02-29", "%Y-%m-%d").date())
