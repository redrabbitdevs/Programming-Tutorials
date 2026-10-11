#!/usr/bin/env python3
"""Generate language catalog pages from .orchestration/languages.json.

For every entry, writes site/src/content/languages/<slug>.md with frontmatter
matching the `languages` collection schema in site/src/content.config.ts:
slug, name, tier, paradigm (non-empty list), firstAppeared (optional),
summary, status.

- summary comes from research/_catalog/summaries/*.json when a non-null summary
  exists for the slug. Otherwise a neutral fallback is built from the known
  fields, leaving out any part that is unknown.
- paradigm comes from the summary file when it has a non-empty list, else from
  the catalog. The schema requires at least one value, so an entry with no
  known paradigm gets the placeholder "unclassified".
- status is "planned", except python, which is "in-progress".

Protected files are never overwritten: python.md (by name, since it is
hand-written), and any existing page whose frontmatter has handwritten: true.

Usage: python3 scripts/gen_languages.py [--dry-run]
"""
import argparse
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
CATALOG = ROOT / ".orchestration" / "languages.json"
SUMMARY_DIR = ROOT / "research" / "_catalog" / "summaries"
OUT_DIR = ROOT / "site" / "src" / "content" / "languages"

PROTECTED_SLUGS = {"python"}
PLACEHOLDER_PARADIGM = "unclassified"
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")
HANDWRITTEN_RE = re.compile(r"^handwritten:\s*true\s*$", re.MULTILINE)
VOWELS = "aeiouAEIOU"


def load_summaries():
    """Return {slug: record} from every summaries/*.json file (lists or {"items": [...]})."""
    found = {}
    if not SUMMARY_DIR.is_dir():
        return found
    for path in sorted(SUMMARY_DIR.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        records = data.get("items", []) if isinstance(data, dict) else data
        for rec in records:
            slug = rec.get("slug")
            if slug:
                found[slug] = rec
    return found


def fallback_summary(name, paradigms, year):
    """Short honest sentence built only from verified fields; missing fields are left out."""
    if not paradigms and not year:
        return f"{name} is a programming language. A full overview has not been written yet."
    kinds = [p for p in paradigms if p and p != PLACEHOLDER_PARADIGM][:2]
    if kinds:
        phrase = " and ".join(kinds)
        article = "an" if phrase[:1] in VOWELS else "a"
        text = f"{name} is {article} {phrase} programming language"
    else:
        text = f"{name} is a programming language"
    if year:
        text += f" that first appeared in {year}"
    return text + "."


def yaml_str(value):
    # JSON string literals are valid double-quoted YAML scalars.
    return json.dumps(value, ensure_ascii=False)


def is_handwritten(path):
    if not path.exists():
        return False
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return False
    end = text.find("\n---", 3)
    front = text[: end if end != -1 else len(text)]
    return bool(HANDWRITTEN_RE.search(front))


def build_page(entry, summary_rec):
    slug = entry["slug"]
    name = entry["name"]
    catalog_paradigms = [p for p in entry.get("paradigm") or [] if p]
    summary_paradigms = [p for p in (summary_rec or {}).get("paradigms") or [] if p]
    paradigms = summary_paradigms or catalog_paradigms
    year = entry.get("firstAppeared")

    summary = (summary_rec or {}).get("summary")
    if not summary:
        summary = fallback_summary(name, paradigms, year)

    status = "in-progress" if slug == "python" else "planned"
    lines = [
        "---",
        f"slug: {yaml_str(slug)}",
        f"name: {yaml_str(name)}",
        f"tier: {int(entry['tier'])}",
        "paradigm: [" + ", ".join(yaml_str(p) for p in (paradigms or [PLACEHOLDER_PARADIGM])) + "]",
    ]
    if isinstance(year, int):
        lines.append(f"firstAppeared: {year}")
    lines += [
        f"summary: {yaml_str(summary)}",
        f"status: {status}",
        "---",
        "",
    ]
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dry-run", action="store_true", help="report what would be written, write nothing")
    args = parser.parse_args()

    entries = json.loads(CATALOG.read_text(encoding="utf-8"))
    summaries = load_summaries()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    written = skipped = 0
    seen = set()
    for entry in entries:
        slug = entry["slug"]
        if not SLUG_RE.match(slug):
            sys.exit(f"invalid slug: {slug!r}")
        if slug in seen:
            sys.exit(f"duplicate slug: {slug!r}")
        seen.add(slug)

        path = OUT_DIR / f"{slug}.md"
        if slug in PROTECTED_SLUGS or is_handwritten(path):
            print(f"skip   {path.relative_to(ROOT)} (protected)")
            skipped += 1
            continue

        page = build_page(entry, summaries.get(slug))
        if args.dry_run:
            print(f"would write {path.relative_to(ROOT)}")
        else:
            path.write_text(page, encoding="utf-8")
        written += 1

    action = "would write" if args.dry_run else "wrote"
    print(f"{action} {written} page(s), skipped {skipped} protected")


if __name__ == "__main__":
    main()
