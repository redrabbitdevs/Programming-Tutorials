import io
import logging

stream = io.StringIO()
logging.basicConfig(stream=stream, format="%(levelname)s %(message)s")
log = logging.getLogger("importer")


def parse_row(row):
    return int(row)


for row in ["12", "x7"]:
    try:
        print("parsed", parse_row(row))
    except ValueError:
        log.exception("bad row %r", row)

lines = stream.getvalue().splitlines()
print(lines[0])
print("traceback included:", "Traceback (most recent call last):" in lines)
print(lines[-1])
