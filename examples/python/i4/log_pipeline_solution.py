from collections import Counter

LOG = """\
2026-10-09 08:00:01 INFO server started
2026-10-09 08:00:05 ERROR disk almost full
2026-10-09 08:01:12 INFO request ok
2026-10-09 08:02:40 ERROR timeout talking to db
2026-10-09 08:03:00 WARN slow request
2026-10-09 08:03:30 ERROR timeout talking to db
"""


def read_lines(text):
    for line in text.splitlines():
        yield line


def only_level(lines, level):
    for line in lines:
        if f" {level} " in line:
            yield line


def messages(lines):
    for line in lines:
        yield line.split(" ", 3)[3]


errors = messages(only_level(read_lines(LOG), "ERROR"))
counts = Counter(errors)
for message, count in counts.most_common():
    print(count, message)
