from datetime import UTC, datetime

now = datetime.now(tz=UTC)
print(now.tzinfo)
print(now.utcoffset())
print(type(now).__name__)
