from datetime import date, datetime

launch = date(2026, 3, 8)
print(launch)
print(launch.year, launch.month, launch.day)
print(launch.weekday(), launch.isoweekday())

meeting = datetime(2026, 3, 8, 14, 30)
print(meeting)
print(meeting.hour, meeting.minute)
print(meeting.date())
