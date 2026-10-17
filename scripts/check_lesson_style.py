#!/usr/bin/env python3
"""Ratchet check for the "one idea per code block" standard.

A code block in a lesson body (exercises excluded) should be at most 20 lines
and 80 columns. Many older lessons predate the rule, so the current counts are
recorded per lesson in scripts/lesson_style_baseline.json. A lesson fails only
when it has MORE long or wide blocks than its baseline, so new lessons must
meet the rule and old ones can only get better.

Usage: check_lesson_style.py            check against the baseline
       check_lesson_style.py --update   rewrite the baseline from the lessons
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ROOT = REPO / "site" / "src" / "content" / "lessons"
BASELINE = REPO / "scripts" / "lesson_style_baseline.json"
MAX_LINES, MAX_COLS = 20, 80
FENCE = re.compile(r"^```(\w*)[^\n]*\n(.*?)^```", re.M | re.S)
EXERCISE = re.compile(r"<Exercise\b.*?</Exercise>", re.S)
# Output, transcripts and data files are not code a learner reads as one idea.
SKIP = {"", "text", "console", "output", "json", "toml", "yaml", "csv", "diff"}


def counts(path):
    body = EXERCISE.sub("", path.read_text(encoding="utf-8"))
    long = wide = 0
    for m in FENCE.finditer(body):
        if m.group(1) in SKIP:
            continue
        lines = m.group(2).splitlines()
        long += len(lines) > MAX_LINES
        wide += any(len(line) > MAX_COLS for line in lines)
    return long, wide


def main():
    current = {}
    for path in sorted(ROOT.rglob("*.mdx")):
        long, wide = counts(path)
        if long or wide:
            current[path.relative_to(ROOT).as_posix()] = [long, wide]
    if "--update" in sys.argv:
        BASELINE.write_text(json.dumps(current, indent=1, sort_keys=True) + "\n")
        print(f"lesson style: baseline written for {len(current)} lessons")
        return 0
    base = json.loads(BASELINE.read_text()) if BASELINE.exists() else {}
    bad = 0
    for rel, (long, wide) in current.items():
        allowed = base.get(rel, [0, 0])
        if long > allowed[0]:
            bad += 1
            print(f"FAIL {rel}: {long} code blocks over {MAX_LINES} lines (baseline {allowed[0]})")
        if wide > allowed[1]:
            bad += 1
            print(f"FAIL {rel}: {wide} code blocks over {MAX_COLS} columns (baseline {allowed[1]})")
    improved = sum(1 for rel, b in base.items() if current.get(rel, [0, 0]) < b)
    print(f"lesson style: {len(current)} lessons over the limits, {improved} below baseline, {bad} failed")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
