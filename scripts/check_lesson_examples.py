#!/usr/bin/env python3
"""Check that lesson code and output match the verified files in examples/.

For every lesson .mdx, each titled python, js or javascript block (title="x.py" or "x.mjs") is matched to
examples/<language>/**/x.py (examples/fundamentals for fundamentals lessons).
Blocks titled "x.py (continued)" are joined to the block they continue. The
untitled `text` block that directly follows a python block is its output; the
outputs of a joined block are concatenated and compared with x.out.

Only trailing whitespace is normalised. Known, justified differences live in
scripts/lesson_examples_allow.txt, one per line:

    <lesson path under site/src/content/lessons> | <title> | code or out | <reason>

Add "#2" to the title for the second block with that title in a lesson.
An allowlist entry that no longer matches a mismatch is an error, so the list
cannot go stale.

Usage: scripts/check_lesson_examples.py [-v]     (standard library only)
"""
import difflib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LESSONS = ROOT / "site" / "src" / "content" / "lessons"
EXAMPLES = ROOT / "examples"
ALLOW = Path(__file__).with_name("lesson_examples_allow.txt")

FENCE = re.compile(r"^(?P<indent>[ \t]*)```(?P<info>[^\n]*)$")
CLOSE = re.compile(r"^[ \t]*```\s*$")
# Fence languages that carry a runnable example (python x.py, js/javascript x.mjs).
CODE_LANGS = ("python", "js", "javascript")
TITLE = re.compile(r'title="([^"]*)"')


def norm(text):
    return "\n".join(line.rstrip() for line in text.rstrip("\n").split("\n"))


def squash(text):
    """Drop blank lines. Used only for joined (continued) blocks, where the
    blank lines between parts are not part of any block."""
    return "\n".join(ln for ln in norm(text).split("\n") if ln)


def parse_blocks(path):
    """Yield (line, lang, title, other_attrs, code) for every fenced block."""
    lines = path.read_text(encoding="utf-8").split("\n")
    i = 0
    while i < len(lines):
        m = FENCE.match(lines[i])
        if not m:
            i += 1
            continue
        indent, info = m.group("indent"), m.group("info").strip()
        j = i + 1
        while j < len(lines) and not CLOSE.match(lines[j]):
            j += 1
        body = [ln[len(indent):] if ln.startswith(indent) else ln.lstrip()
                for ln in lines[i + 1:j]]
        lang = info.split(" ")[0] if info else ""
        t = TITLE.search(info)
        rest = TITLE.sub("", info[len(lang):]).strip()
        yield (i + 1, lang, t.group(1) if t else None, rest, "\n".join(body))
        i = j + 1


def collect(path):
    """Return titled python blocks, with continued parts joined."""
    blocks = list(parse_blocks(path))
    items = []
    by_title = {}
    for n, (line, lang, title, _rest, code) in enumerate(blocks):
        if lang not in CODE_LANGS or not title:
            continue
        out = None
        if n + 1 < len(blocks):
            _l, nlang, ntitle, nrest, ncode = blocks[n + 1]
            if nlang == "text" and ntitle is None and not nrest:
                out = ncode
        cont = title.endswith(" (continued)")
        base = title[: -len(" (continued)")] if cont else title
        if cont and base in by_title:
            it = by_title[base]
            it["code"].append(code)
            if out is not None:
                it["outs"].append(out)
            continue
        it = {"title": base, "line": line, "code": [code],
              "outs": [out] if out is not None else []}
        items.append(it)
        by_title[base] = it
    return items


def example_candidates(lesson, title):
    tree = EXAMPLES / lesson.relative_to(LESSONS).parts[0]
    suffix = "/" + Path(title).as_posix()
    return sorted(p for p in tree.rglob(Path(title).name)
                  if p.is_file() and p.as_posix().endswith(suffix))


def load_allow():
    entries = {}
    if not ALLOW.exists():
        return entries
    for raw in ALLOW.read_text(encoding="utf-8").splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        parts = [p.strip() for p in raw.split("|", 3)]
        if len(parts) != 4 or parts[2] not in ("code", "out") or not parts[3]:
            sys.exit(f"bad allowlist line: {raw}")
        entries[(parts[0], parts[1], parts[2])] = False
    return entries


def main():
    verbose = "-v" in sys.argv
    allow = load_allow()
    checked = failures = allowed = unmatched = 0
    for lesson in sorted(LESSONS.rglob("*.mdx")):
        rel = lesson.relative_to(LESSONS).as_posix()
        seen = {}
        for it in collect(lesson):
            seen[it["title"]] = seen.get(it["title"], 0) + 1
            n = seen[it["title"]]
            key_title = it["title"] if n == 1 else f'{it["title"]}#{n}'
            where = f"{lesson.relative_to(ROOT)}:{it['line']}"
            cands = example_candidates(lesson, it["title"])
            if not cands:
                # Snippets with no verified copy (broken code, exercise
                # starters) have nothing to compare against.
                unmatched += 1
                if verbose:
                    print(f"skip {where}: no examples file for {it['title']}")
                continue
            joined = len(it["code"]) > 1
            fix = squash if joined else norm
            code = fix("\n".join(it["code"]))
            match = [c for c in cands
                     if fix(c.read_text(encoding="utf-8")) == code]
            ref = match[0] if match else max(cands, key=lambda c: difflib.SequenceMatcher(
                None, code, norm(c.read_text(encoding="utf-8"))).ratio())
            checked += 1
            bad = []
            if not match:
                bad.append("code")
            if it["outs"]:
                checked += 1
                outfile = ref.with_suffix(".out")
                if (not outfile.exists() or norm("\n".join(it["outs"]))
                        != norm(outfile.read_text(encoding="utf-8"))):
                    bad.append("out")
            for kind in bad:
                key = (rel, key_title, kind)
                if key in allow:
                    allow[key] = True
                    allowed += 1
                    continue
                failures += 1
                ref_file = ref if kind == "code" else ref.with_suffix(".out")
                print(f"FAIL {where}: {kind} of {it['title']} differs from "
                      f"{ref_file.relative_to(ROOT)}")
                if verbose and ref_file.exists():
                    mine = code if kind == "code" else norm("\n".join(it["outs"]))
                    theirs = norm(ref_file.read_text(encoding="utf-8"))
                    for d in list(difflib.unified_diff(
                            theirs.split("\n"), mine.split("\n"),
                            "example", "lesson", lineterm="", n=0))[:14]:
                        print("      " + d)
    for key, used in allow.items():
        if not used:
            print("FAIL stale allowlist entry (no mismatch any more): "
                  + " | ".join(key))
            failures += 1
    print(f"lesson examples: {checked} comparisons, {allowed} allowlisted, "
          f"{unmatched} blocks without an examples file (skipped), "
          f"{failures} failed")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
