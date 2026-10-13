#!/usr/bin/env python3
"""Fail on a bare __dunder__ name in a lesson heading.

Markdown reads __name__ as strong emphasis, so the heading renders as bold
text with the underscores gone. Write ``## `__eq__`: equality`` instead.

Lessons under advanced/ only WARN for now.
# TODO: make advanced/ fail too, once the advanced Writers' PRs that fix their
# headings have merged (flip ADVANCED_WARN_ONLY to False).

Usage: scripts/check_headings.py   (stdlib only)
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LESSONS = ROOT / "site" / "src" / "content" / "lessons"
ADVANCED_WARN_ONLY = True
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
    fails = warns = 0
    files = sorted(LESSONS.rglob("*.mdx"))
    for f in files:
        soft = ADVANCED_WARN_ONLY and "advanced" in f.relative_to(LESSONS).parts
        for n, line in headings(f):
            print(f"{'warn' if soft else 'FAIL'} {f.relative_to(ROOT)}:{n}: "
                  f"bare dunder in heading, wrap it in backticks: {line}")
            warns += soft
            fails += not soft
    print(f"headings: {len(files)} lessons, {fails} failed, {warns} advanced warnings")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
