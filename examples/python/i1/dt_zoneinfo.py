from datetime import UTC, datetime
from zoneinfo import ZoneInfo

departure = datetime(2026, 7, 1, 9, 0, tzinfo=ZoneInfo("Europe/London"))
print(departure)
print(departure.utcoffset())
print(departure.tzname())
print(departure.astimezone(UTC))
print(departure.astimezone(ZoneInfo("Asia/Tokyo")))

winter = datetime(2026, 1, 1, 9, 0, tzinfo=ZoneInfo("Europe/London"))
print(winter, winter.tzname())
