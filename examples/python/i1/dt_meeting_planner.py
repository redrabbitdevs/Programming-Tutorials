from datetime import UTC, datetime
from zoneinfo import ZoneInfo

start = datetime(2026, 3, 9, 9, 0, tzinfo=ZoneInfo("America/New_York"))

print("UTC:", start.astimezone(UTC).strftime("%Y-%m-%d %H:%M"))
for city, zone in [
    ("New York", "America/New_York"),
    ("London", "Europe/London"),
    ("Tokyo", "Asia/Tokyo"),
]:
    local = start.astimezone(ZoneInfo(zone))
    print(f"{city}: {local:%a %d %b %H:%M} {local.tzname()}")
