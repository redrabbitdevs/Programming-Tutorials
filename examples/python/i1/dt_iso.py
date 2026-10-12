from datetime import date, datetime

moment = datetime(2026, 3, 8, 14, 5, 9)
text = moment.isoformat()
print(text)
print(moment.isoformat(sep=" ", timespec="minutes"))
print(date(2026, 3, 8).isoformat())

print(datetime.fromisoformat(text) == moment)
print(date.fromisoformat("2026-03-08"))
