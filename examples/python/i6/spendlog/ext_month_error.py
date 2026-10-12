import argparse
import contextlib
import sys
from datetime import datetime


def parse_month(text):
    try:
        return datetime.strptime(text, "%Y-%m").date()
    except ValueError:
        raise argparse.ArgumentTypeError(f"not a month: {text!r} (use YYYY-MM)") from None


parser = argparse.ArgumentParser(prog="spend")
parser.add_argument("--month", type=parse_month)

print(parser.parse_args(["--month", "2026-03"]).month)

# argparse writes its error to stderr and exits with code 2.
with contextlib.redirect_stderr(sys.stdout):
    try:
        parser.parse_args(["--month", "2026-13"])
    except SystemExit as stop:
        print("exit code", stop.code)
