from datetime import UTC, datetime

naive = datetime(2026, 3, 8, 12, 0)
aware = datetime(2026, 3, 8, 12, 0, tzinfo=UTC)

print(naive == aware)
try:
    print(naive < aware)
except TypeError as error:
    print("TypeError:", error)
print(aware.replace(tzinfo=None) == naive)
