def is_leap(year):
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    return year % 4 == 0


tests = [(2000, True), (1900, False), (2024, True), (2023, False), (2100, False)]
for year, expected in tests:
    result = is_leap(year)
    status = "ok" if result == expected else "WRONG"
    print(year, result, status)
