import re

LINE = re.compile(
    r"""
    (?P<date>\d{4}-\d{2}-\d{2})\s
    (?P<time>\d{2}:\d{2}:\d{2})\s
    (?P<level>[A-Z]+)\s+
    \[(?P<module>\w+)\]\s
    (?P<msg>.+)
    """,
    re.VERBOSE,
)

lines = [
    "2026-10-12 09:15:02 INFO  [auth] user ada logged in",
    "2026-10-12 09:15:07 ERROR [db] connection lost (retry 1)",
    "garbage line",
    "2026-10-12 09:16:00 WARNING [db] slow query: 2.5s",
]

for line in lines:
    m = LINE.fullmatch(line)
    if m is None:
        print("skipped:", repr(line))
        continue
    print(f"{m['time']} {m['level']} {m['module']}: {m['msg']}")
