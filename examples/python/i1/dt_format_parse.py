from datetime import datetime

moment = datetime(2026, 3, 8, 14, 5)
print(moment.strftime("%Y-%m-%d"))
print(moment.strftime("%d/%m/%y %H:%M"))
print(moment.strftime("%A %d %B %Y, %I:%M %p"))

parsed = datetime.strptime("08/03/2026 14:05", "%d/%m/%Y %H:%M")
print(parsed)
print(parsed == moment)

try:
    datetime.strptime("2026-03-08", "%d/%m/%Y")
except ValueError as error:
    print(error)
