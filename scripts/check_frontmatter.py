#!/usr/bin/env python3
"""Catch frontmatter values that YAML silently truncates.

In a plain (unquoted) YAML scalar, a space followed by `#` starts a comment,
so `description: Hide state with #private fields` parses as "Hide state with".
The site still builds, which is why this needs its own check. Quote the value.
Files whose name starts with `_` (templates) may use comments on purpose.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "site" / "src" / "content"
FRONT = re.compile(r"\A---\n(.*?)\n---\n", re.S)
ENTRY = re.compile(r"^\s*(?:-\s+|[\w.-]+:\s+)(.*)$")


def main():
    bad = files = 0
    for path in sorted(ROOT.rglob("*.md*")):
        if path.name.startswith("_"):
            continue
        m = FRONT.match(path.read_text(encoding="utf-8"))
        if not m:
            continue
        files += 1
        for n, line in enumerate(m.group(1).splitlines(), start=2):
            e = ENTRY.match(line)
            if not e or e.group(1)[:1] in "\"'[{|>":
                continue
            if re.search(r"\s#", e.group(1)):
                bad += 1
                print(f"FAIL {path.relative_to(ROOT)}:{n}: unquoted ' #' starts a YAML comment; quote the value")
    print(f"frontmatter: {files} files, {bad} failed")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
