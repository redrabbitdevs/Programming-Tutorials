#!/usr/bin/env python3
"""Check that every lesson's `fundamentals:` ids name an existing lesson.

Collection ids keep the numeric prefix (fundamentals/beginner/04-variables-and-assignment).
An id without it resolves to nothing, and the lesson page silently drops the
"Builds on" link, so the site build does not catch it.

Usage: check_fundamentals.py          report and exit 1 on any unknown id
       check_fundamentals.py --fix    also rewrite unprefixed ids that match exactly one lesson
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "site" / "src" / "content" / "lessons"
FRONT = re.compile(r"\A---\n(.*?)\n---\n", re.S)
INLINE = re.compile(r"^fundamentals:\s*\[(.*?)\]\s*$", re.M)
BLOCK = re.compile(r"^fundamentals:\s*\n((?:[ \t]+-[^\n]*\n?)*)", re.M)


def lesson_ids():
    return {p.relative_to(ROOT).with_suffix("").as_posix() for p in ROOT.rglob("*.mdx")}


def ids_in(front):
    m = INLINE.search(front)
    if m:
        return [s.strip().strip("\"'") for s in m.group(1).split(",") if s.strip()]
    m = BLOCK.search(front)
    if m:
        return [line.split("-", 1)[1].strip().strip("\"'") for line in m.group(1).splitlines() if line.strip()]
    return []


def main():
    fix = "--fix" in sys.argv
    known = lesson_ids()
    by_slug = {}
    for i in known:
        head, _, name = i.rpartition("/")
        by_slug.setdefault(f"{head}/{re.sub(r'^[0-9]+-', '', name)}", []).append(i)
    bad = checked = 0
    for path in sorted(ROOT.rglob("*.mdx")):
        text = path.read_text(encoding="utf-8")
        m = FRONT.match(text)
        if not m:
            continue
        front = m.group(1)
        new_front = front
        for i in ids_in(front):
            checked += 1
            if i in known:
                continue
            match = by_slug.get(i, [])
            if fix and len(match) == 1:
                new_front = re.sub(rf"(?<![\w/-]){re.escape(i)}(?![\w-])", match[0], new_front)
                print(f"fixed {path.relative_to(ROOT)}: {i} -> {match[0]}")
                continue
            bad += 1
            hint = f" (did you mean {match[0]}?)" if len(match) == 1 else ""
            print(f"FAIL {path.relative_to(ROOT)}: unknown fundamentals id {i}{hint}")
        if new_front != front:
            path.write_text(text.replace(front, new_front, 1), encoding="utf-8")
    print(f"fundamentals ids: {checked} checked, {bad} failed")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
