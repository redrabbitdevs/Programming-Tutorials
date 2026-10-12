import re

LOG = re.compile(
    r"""
    (?P<level>INFO|WARNING|ERROR)   # severity
    \s+
    \[(?P<module>\w+)\]             # module name in brackets
    \s+
    (?P<msg>.*)                     # the rest of the line
    """,
    re.VERBOSE | re.IGNORECASE,
)

for line in ["error [db] timeout", "INFO [web] started", "debug [x] y"]:
    m = LOG.fullmatch(line)
    if m:
        print(m["level"], m["module"], m["msg"])
    else:
        print("no match:", line)
