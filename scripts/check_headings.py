#!/usr/bin/env python3
"""Fail on a bare __dunder__ name in a lesson heading.

Markdown reads __name__ as strong emphasis, so the heading renders as bold
text with the underscores gone. Write ``## `__eq__`: equality`` instead.

Usage: scripts/check_headings.py   (stdlib only)
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LESSONS = ROOT / "site" / "src" / "content" / "lessons"
BARE = re.compile(r"(?<!`)__\w+__(?!`)")


def headings(path):
    fence = None
    for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        m = re.match(r"\s*(`{3,}|~{3,})", line)
        if m:
            if fence is None:
                fence = m.group(1)[0]
            elif m.group(1)[0] == fence:
                fence = None
            continue
        if fence is None and re.match(r"#{1,6}\s", line):
            # Drop inline code spans, then look for what is left.
            if BARE.search(re.sub(r"`[^`]*`", "", line)):
                yield n, line


def main():
    fails = 0
    files = sorted(LESSONS.rglob("*.mdx"))
    for f in files:
        for n, line in headings(f):
            print(f"FAIL {f.relative_to(ROOT)}:{n}: "
                  f"bare dunder in heading, wrap it in backticks: {line}")
            fails += 1
    print(f"headings: {len(files)} lessons, {fails} failed")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
