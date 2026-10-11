import sys

lazy import asyncio
lazy import statistics
lazy import zipfile

HEAVY = ["asyncio", "statistics", "zipfile"]


def loaded():
    return [name for name in HEAVY if name in sys.modules]


def main(args):
    if args[:1] == ["--stats"]:
        print("mean:", statistics.mean(float(x) for x in args[1:]))
    else:
        print("usage: cli --stats NUMBER...")
    print("loaded:", loaded())


main(["--help"])
main(["--stats", "1", "2", "6"])
