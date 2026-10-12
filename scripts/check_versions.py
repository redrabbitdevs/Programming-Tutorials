#!/usr/bin/env python3
"""Check version claims in lessons.

Rule: minVersion is the lowest version the unlabelled core path needs; newer
sections carry `<Since>`.

Checks, for every lesson .mdx (code fences are ignored):
  FAIL  a lesson has `<Since>` tags but the highest is below its minVersion
  FAIL  a `<Since>` appears inside a heading line (mark the first sentence of
        the section instead)
  warn  a `<Since>` at or below minVersion is redundant

Optional: --run-under PYTHON runs the examples behind each python lesson with
that interpreter. A failure is reported as a warning when the lesson's
minVersion is above the interpreter, or the example sits in a section marked
`<Since>` with a version above it, since those failures are expected. Any other
failure is an error.

Usage: scripts/check_versions.py [--run-under /path/to/python]   (stdlib only)
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LESSONS = ROOT / "site" / "src" / "content" / "lessons"
SINCE = re.compile(r'<Since\s+v="([0-9][0-9.]*)"')
MIN = re.compile(r'^minVersion:\s*["\']?([0-9][0-9.]*)["\']?\s*$', re.M)
HEADING = re.compile(r"^#{1,6}\s")
TITLE = re.compile(r'title="([^"]*)"')


def ver(text):
    return tuple(int(p) for p in text.split("."))


def scan(path):
    """Return (minVersion or None, [(line, version, in_heading, section)], blocks).

    section is the index of the heading section a Since or block belongs to.
    blocks is [(line, title, section)] for titled python blocks.
    """
    text = path.read_text(encoding="utf-8")
    m = MIN.search(text.split("\n---", 2)[0] if text.startswith("---") else "")
    min_version = m.group(1) if m else None
    sinces, blocks = [], []
    in_fence = False
    section = 0
    for n, line in enumerate(text.split("\n"), 1):
        if line.lstrip().startswith("```"):
            if not in_fence:
                info = line.lstrip()[3:]
                t = TITLE.search(info)
                if info.startswith("python") and t:
                    blocks.append((n, t.group(1), section))
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        heading = bool(HEADING.match(line))
        if heading:
            section += 1
        for s in SINCE.finditer(line):
            sinces.append((n, s.group(1), heading, section))
    return min_version, sinces, blocks


def example_file(lesson, title):
    base = re.sub(r" \(continued\)$", "", title)
    tree = EXAMPLES_ROOT / lesson.relative_to(LESSONS).parts[0]
    suffix = "/" + base
    for p in sorted(tree.rglob(Path(base).name)):
        if p.as_posix().endswith(suffix):
            return p
    return None


EXAMPLES_ROOT = ROOT / "examples"


def run_under(python, lessons_info):
    out = subprocess.run([python, "-c", "import sys;print('%d.%d' % sys.version_info[:2])"],
                         capture_output=True, text=True, check=True).stdout.strip()
    target = ver(out)
    errors = warns = ran = 0
    done = set()
    for lesson, (min_version, sinces, blocks) in lessons_info:
        if not lesson.relative_to(LESSONS).parts[0] == "python":
            continue
        gated = {s for _l, v, _h, s in sinces if ver(v) > target}
        too_new = min_version is not None and ver(min_version) > target
        for line, title, section in blocks:
            f = example_file(lesson, title)
            if f is None or f in done:
                continue
            if any(l.endswith("__init__.py") for l in [str(f.parent / "__init__.py")]) \
                    and (f.parent / "__init__.py").exists():
                continue
            done.add(f)
            ran += 1
            stdin = f.with_suffix(".in")
            try:
                r = subprocess.run([python, f.name], cwd=f.parent, capture_output=True,
                                   text=True, timeout=30,
                                   stdin=open(stdin) if stdin.exists() else subprocess.DEVNULL)
                ok = r.returncode == 0
                # Teaching examples with red tests exit non-zero on purpose,
                # which validate.sh accepts when a .out file records them.
                if not ok and f.with_suffix(".out").exists() \
                        and "unittest.main(" in f.read_text(encoding="utf-8"):
                    ok = True
                detail = r.stderr.strip().split("\n")[-1] if r.stderr.strip() else ""
            except subprocess.TimeoutExpired:
                ok, detail = False, "timeout"
            if ok:
                continue
            where = f"{lesson.relative_to(ROOT)}:{line}"
            # A failing example is a failure only if the lesson claims to support
            # this interpreter, and the block is not in a newer-version section.
            if too_new or section in gated:
                warns += 1
                print(f"warn {where}: {f.name} fails on {out} (expected: newer section): {detail}")
            else:
                errors += 1
                print(f"FAIL {where}: {f.name} fails on Python {out} but the lesson allows it: {detail}")
    print(f"run-under {out}: {ran} examples run, {errors} failed, {warns} expected failures")
    return errors


def main():
    argv = sys.argv[1:]
    python = None
    if "--run-under" in argv:
        python = argv[argv.index("--run-under") + 1]
    fails = warns = nsince = 0
    info = []
    lessons = sorted(LESSONS.rglob("*.mdx"))
    for lesson in lessons:
        data = scan(lesson)
        info.append((lesson, data))
        min_version, sinces, _blocks = data
        rel = lesson.relative_to(ROOT)
        if min_version is None:
            continue
        nsince += len(sinces)
        for line, v, heading, _s in sinces:
            if heading:
                print(f"FAIL {rel}:{line}: <Since v=\"{v}\"> inside a heading; "
                      f"put it at the start of the section's first sentence")
                fails += 1
            if ver(v) <= ver(min_version):
                print(f"warn {rel}:{line}: <Since v=\"{v}\"> is redundant, "
                      f"minVersion is {min_version}")
                warns += 1
        if sinces:
            top = max(sinces, key=lambda s: ver(s[1]))
            if ver(top[1]) < ver(min_version):
                print(f"FAIL {rel}:{top[0]}: highest <Since> is {top[1]}, below "
                      f"minVersion {min_version}")
                fails += 1
    print(f"versions: {len(lessons)} lessons, {nsince} <Since> tags, "
          f"{warns} redundant (warning), {fails} failed")
    if python:
        fails += run_under(python, info)
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
