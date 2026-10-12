from datetime import UTC, datetime, timedelta
from zoneinfo import ZoneInfo

new_york = ZoneInfo("America/New_York")

before = datetime(2026, 3, 8, 1, 30, tzinfo=new_york)
print(before, before.tzname())

wall = before + timedelta(hours=1)
print(wall, wall.tzname())

exact = (before.astimezone(UTC) + timedelta(hours=1)).astimezone(new_york)
print(exact, exact.tzname())
