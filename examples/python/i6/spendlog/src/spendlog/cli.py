import argparse
import logging
import sys
from datetime import datetime
from pathlib import Path

from .report import format_expense, format_report, in_month, total_by_category
from .store import parse_expenses, read_rows

log = logging.getLogger(__name__)


def parse_month(text):
    return datetime.strptime(text, "%Y-%m").date()


def build_parser():
    parser = argparse.ArgumentParser(prog="spend", description="Summarise expenses from a CSV file.")
    parser.add_argument("--file", type=Path, default=Path("expenses.csv"), help="CSV file to read")
    parser.add_argument("--month", type=parse_month, help="only this month, as YYYY-MM")
    parser.add_argument("--list", action="store_true", help="also list every expense")
    parser.add_argument("-v", "--verbose", action="store_true", help="log progress to stderr")
    return parser


def main(argv=None):
    args = build_parser().parse_args(argv)
    logging.basicConfig(
        level=logging.INFO if args.verbose else logging.WARNING,
        format="%(levelname)s %(name)s: %(message)s",
    )

    try:
        expenses = parse_expenses(read_rows(args.file))
        if args.month:
            expenses = in_month(expenses, args.month)
        expenses = list(expenses)
    except FileNotFoundError:
        print(f"spend: cannot find {args.file}", file=sys.stderr)
        return 1

    log.info("loaded %d expenses from %s", len(expenses), args.file)
    if args.list:
        for expense in expenses:
            print(format_expense(expense))
        print()
    print(format_report(total_by_category(expenses)))
    return 0
