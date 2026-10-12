from datetime import UTC, datetime, timedelta, timezone

naive = datetime(2026, 3, 8, 14, 30)
aware = datetime(2026, 3, 8, 14, 30, tzinfo=UTC)
print(naive.tzinfo)
print(aware.tzinfo)
print(aware)
print(aware.isoformat())

plus_two = timezone(timedelta(hours=2))
local = datetime(2026, 3, 8, 16, 30, tzinfo=plus_two)
print(local)
print(local == aware)
print(local.astimezone(UTC))
