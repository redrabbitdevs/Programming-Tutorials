"""Build the language catalog (.orchestration/languages.json).

Source of the language list: Wikipedia, "List of programming languages"
(https://en.wikipedia.org/wiki/List_of_programming_languages), read through the
MediaWiki API. Paradigm and first-appeared year come from each article's
infobox, fetched in batches of 50 titles. Tier 1 and tier 2 come from
research/_catalog/ranking.md (mirrored in TIERS below); everything else is tier 3.

Usage:
    python3 research/_catalog/build.py [--cache DIR] [--offline]

--cache DIR  store raw API responses in DIR and reuse them on later runs
--offline    use only the cache (fails if a response is missing)

Output: an array of
    {slug, name, tier, paradigm[], firstAppeared|null, aliases[], wikipedia}
sorted by tier, then tier order (tiers 1-2) or name (tier 3).
"""
import argparse
import hashlib
import json
import pathlib
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / ".orchestration" / "languages.json"
API = "https://en.wikipedia.org/w/api.php"
LIST_PAGE = "List_of_programming_languages"
UA = ("ProgrammingTutorialsCatalog/1.0 "
      "(https://github.com/redrabbitdevs/Programming-Tutorials; catalog build script)")

# Tier 1 and 2, in curriculum order. See ranking.md for the method.
# (slug, display name, Wikipedia title as linked from the list page, extra aliases)
TIER1 = [
    ("python", "Python", "Python (programming language)", ["py"]),
    ("javascript", "JavaScript", "JavaScript", ["JS", "ECMAScript"]),
    ("typescript", "TypeScript", "TypeScript", ["TS"]),
    ("java", "Java", "Java (programming language)", []),
    ("csharp", "C#", "C Sharp (programming language)", ["C sharp"]),
    ("cpp", "C++", "C++", ["cplusplus"]),
    ("c", "C", "C (programming language)", []),
    ("sql", "SQL", "SQL", ["Structured Query Language"]),
    ("bash", "Bash", "Bash (Unix shell)", ["shell", "sh"]),
    ("rust", "Rust", "Rust (programming language)", []),
    ("go", "Go", "Go (programming language)", ["Golang"]),
    ("php", "PHP", "PHP", []),
    ("kotlin", "Kotlin", "Kotlin (programming language)", []),
    ("swift", "Swift", "Swift (programming language)", []),
]
TIER2 = [
    ("powershell", "PowerShell", "PowerShell", ["pwsh"]),
    ("lua", "Lua", "Lua (programming language)", []),
    ("assembly", "Assembly language", "Assembly language", ["asm"]),
    ("ruby", "Ruby", "Ruby (programming language)", []),
    ("dart", "Dart", "Dart (programming language)", []),
    ("r", "R", "R (programming language)", []),
    ("visual-basic", "Visual Basic (.NET)", "Visual Basic (.NET)", ["VB.NET", "VBA", "Classic Visual Basic"]),
    ("groovy", "Groovy", "Apache Groovy", []),
    ("perl", "Perl", "Perl", []),
    ("matlab", "MATLAB", "MATLAB", []),
    ("zig", "Zig", "Zig (programming language)", []),
    ("common-lisp", "Common Lisp", "Common Lisp", ["Lisp", "CL"]),
    ("elixir", "Elixir", "Elixir (programming language)", []),
    ("objective-c", "Objective-C", "Objective-C", ["ObjC"]),
    ("haskell", "Haskell", "Haskell", []),
    ("scala", "Scala", "Scala (programming language)", []),
    ("delphi", "Delphi / Object Pascal", "Object Pascal", ["Delphi"]),
    ("fortran", "Fortran", "Fortran", []),
    ("erlang", "Erlang", "Erlang (programming language)", []),
    ("julia", "Julia", "Julia (programming language)", []),
    ("clojure", "Clojure", "Clojure", []),
    ("gleam", "Gleam", "Gleam (programming language)", []),
    ("ada", "Ada", "Ada (programming language)", []),
    ("fsharp", "F#", "F Sharp (programming language)", ["F sharp"]),
    ("ocaml", "OCaml", "OCaml", []),
    ("cobol", "COBOL", "COBOL", []),
    ("prolog", "Prolog", "Prolog", []),
    ("solidity", "Solidity", "Solidity", []),
    ("mojo", "Mojo", "Mojo (programming language)", []),
]

# Fallback paradigms for tiered languages whose infobox has no paradigm field.
PARADIGM_FALLBACK = {
    "bash": ["imperative", "procedural", "scripting"],
    "matlab": ["multi-paradigm", "imperative", "procedural", "object-oriented", "array"],
}

# Entries on the list page that are markup, styling or data formats rather than
# executable languages. SQL, its dialects and shell languages are kept.
EXCLUDE_TITLES = {
    "HTML", "XML", "XHTML", "CSS", "JSON", "YAML", "TOML", "Markdown", "SGML",
    "LaTeX", "Troff", "Groff (software)", "RTF", "PostScript",
    "XBL", "XUL", "Knowledge Interchange Format",
    "Computer Sciences Corporation",  # a company, listed on the page next to its languages
}
# List-page articles folded into another entry (alias, not a separate language).
MERGE_INTO = {"Delphi (software)": "Object Pascal"}
EXCLUDE_NAME_RE = re.compile(r"\b(markup|data format|serialization format|stylesheet)\b", re.I)


class Fetcher:
    def __init__(self, cache, offline):
        self.cache = pathlib.Path(cache) if cache else None
        self.offline = offline
        if self.cache:
            self.cache.mkdir(parents=True, exist_ok=True)

    def get(self, params):
        params = dict(params, format="json", formatversion="2")
        url = API + "?" + urllib.parse.urlencode(params)
        key = hashlib.sha256(url.encode()).hexdigest()[:24] + ".json"
        if self.cache and (self.cache / key).exists():
            return json.loads((self.cache / key).read_text(encoding="utf-8"))
        if self.offline:
            sys.exit(f"offline and not cached: {url}")
        for attempt in range(8):
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            try:
                with urllib.request.urlopen(req, timeout=60) as r:
                    body = r.read().decode("utf-8")
                data = json.loads(body)
                break
            except (urllib.error.HTTPError, json.JSONDecodeError) as e:
                retry_after = getattr(e, "headers", None) and e.headers.get("Retry-After")
                wait = int(retry_after) if retry_after and retry_after.isdigit() else 30 * (attempt + 1)
                print(f"retry in {wait}s after {e}", file=sys.stderr)
                time.sleep(wait)
        else:
            sys.exit(f"failed: {url}")
        if self.cache:
            (self.cache / key).write_text(json.dumps(data), encoding="utf-8")
        time.sleep(5)  # be polite to the API (it rate-limits bulk content reads)
        return data


LINK_RE = re.compile(r"\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|((?:[^\]]|\](?!\]))+))?\]\]")


def strip_markup(s):
    s = re.sub(r"<ref[^>]*/>", "", s)
    s = re.sub(r"<ref[^>]*>.*?</ref>", "", s, flags=re.S)
    s = re.sub(r"<[^>]+>", "", s)
    s = LINK_RE.sub(lambda m: m.group(2) or m.group(1), s)
    s = re.sub(r"'{2,}", "", s)
    return s.strip()


def split_aliases(text):
    out = []
    for a in re.split(r"[,/;]| or ", text):
        a = re.sub(r"^(also known as|aka|formerly)\s+", "", a.strip(), flags=re.I)
        if a and not re.match(r"^(by|see|from|based on)\b", a, flags=re.I):
            out.append(a)
    return out


def parse_list(wikitext):
    wikitext = re.sub(r"<!--.*?-->", "", wikitext, flags=re.S)
    entries = []
    section = None
    for line in wikitext.splitlines():
        h = re.match(r"^==\s*(.+?)\s*==\s*$", line)
        if h:
            section = h.group(1)
            continue
        if section is None or section.lower().startswith("see also"):
            continue
        if not line.startswith("*"):
            continue
        body = line.lstrip("*").strip()
        m = LINK_RE.search(body)
        if m:
            title = m.group(1).strip()
            display = strip_markup(m.group(2) or re.sub(r"\s*\([^)]*\)$", "", title))
            rest = strip_markup(body[m.end():])
        else:
            title = None
            display = strip_markup(body)
            rest = ""
        aliases = []
        pm = re.match(r"^(.*?)\s*\((.+)\)\s*$", display)
        if pm:
            display, inner = pm.group(1), pm.group(2)
            aliases += split_aliases(inner)
        if "," in display:
            first, *more = split_aliases(display)
            display = first
            aliases += more
        rm = re.match(r"^\s*\(([^)]+)\)", rest)
        if rm:
            aliases += split_aliases(rm.group(1))
        name = display.strip()
        if not name:
            continue
        aliases = [a for a in dict.fromkeys(aliases) if a != name]
        entries.append({"name": name, "title": title, "aliases": aliases})
    return entries


def find_template(text, start_re):
    m = re.search(start_re, text, flags=re.I)
    if not m:
        return None
    i, depth = m.start(), 0
    while i < len(text) - 1:
        if text[i:i + 2] == "{{":
            depth += 1
            i += 2
        elif text[i:i + 2] == "}}":
            depth -= 1
            i += 2
            if depth == 0:
                return text[m.start():i]
        else:
            i += 1
    return None


def infobox_field(box, names):
    for n in names:
        m = re.search(r"\n\s*\|\s*" + n + r"\s*=(.*?)(?=\n\s*\|\s*[\w ]+\s*=|\n\}\}|\Z)", box, flags=re.S)
        if m and m.group(1).strip():
            return m.group(1)
    return None


PARADIGM_MAP = {
    "multi paradigm": "multi-paradigm",
    "object oriented": "object-oriented",
    "object-oriented programming": "object-oriented",
    "functional programming": "functional",
    "imperative programming": "imperative",
    "procedural programming": "procedural",
    "structured programming": "structured",
    "declarative programming": "declarative",
    "concurrent computing": "concurrent",
    "logic programming": "logic",
    "event-driven programming": "event-driven",
    "generic programming": "generic",
    "reflective programming": "reflective",
    "prototype-based programming": "prototype-based",
    "class-based programming": "class-based",
    "array programming": "array",
    "stack-oriented programming": "stack-oriented",
    "metaprogramming": "metaprogramming",
}


def parse_paradigms(raw):
    if not raw:
        return []
    s = re.sub(r"<ref[^>]*/>", "", raw)
    s = re.sub(r"<ref[^>]*>.*?</ref>", "", s, flags=re.S)
    s = re.sub(r"\{\{\s*(?:sfn|efn|citation needed|cn|r|refn)[^{}]*\}\}", "", s, flags=re.I)
    s = LINK_RE.sub(lambda m: m.group(2) or m.group(1), s)
    s = re.sub(r"\{\{\s*cite[^{}]*\}\}", "", s, flags=re.I)
    s = re.sub(r"\{\{\s*[\w -]+\s*(\||\}\})", "|", s)  # drop template names (flatlist, cslist, ...)
    s = s.replace("}}", "|").replace("{{", "|").replace("(", "|").replace(")", "|").replace(":", "|")
    s = re.sub(r"<[^>]+>", "|", s)
    out = []
    for part in re.split(r"[|,;\n*•]|\band\b", s):
        p = part.strip().strip(":.'\"").lower()
        p = re.sub(r"\s+", " ", p)
        if not p or len(p) > 40 or "=" in p or "http" in p:
            continue
        p = PARADIGM_MAP.get(p, p)
        p = re.sub(r"\s+programming$", "", p)
        if p in ("often metaprogramming",):
            p = "metaprogramming"
        if p and p not in out:
            out.append(p)
    return out[:10]


def parse_year(raw):
    if not raw:
        return None
    m = re.search(r"\b(1[89]\d\d|20\d\d)\b", raw)
    return int(m.group(1)) if m else None


def _resolve(q, titles):
    """Map each requested title to its page dict (or None) in one API response."""
    alias = {}
    for kind in ("normalized", "redirects"):
        for r in q.get(kind, []):
            alias[r["from"]] = r["to"]
    pages = {p["title"]: p for p in q.get("pages", [])}
    out = {}
    for t in titles:
        canon = t
        for _ in range(3):
            canon = alias.get(canon, canon)
        out[t] = (canon, pages.get(canon))
    return out


def fetch_infoboxes(fetcher, titles):
    """Return {requested title: (canonical title, paradigm list, year)}.

    Pages already present in any cached batch response are reused, so a change
    to the title list only fetches the titles that are new.
    """
    titles = sorted({t for t in titles if t})
    known = {}
    if fetcher.cache:
        for f in sorted(fetcher.cache.glob("*.json")):
            q = json.loads(f.read_text(encoding="utf-8")).get("query")
            if not q:
                continue
            requested = [p["title"] for p in q.get("pages", [])]
            requested += [r["from"] for k in ("normalized", "redirects") for r in q.get(k, [])]
            for t, (canon, page) in _resolve(q, requested).items():
                if page:
                    known[t] = (canon, page)
    todo = [t for t in titles if t not in known]
    for i in range(0, len(todo), 50):
        batch = todo[i:i + 50]
        data = fetcher.get({
            "action": "query", "prop": "revisions", "rvprop": "content",
            "rvslots": "main", "redirects": "1", "titles": "|".join(batch),
        })
        known.update(_resolve(data.get("query", {}), batch))

    result = {}
    for t in titles:
        canon, page = known.get(t, (None, None))
        if not page or page.get("missing") or "revisions" not in page:
            result[t] = (None, [], None)
            continue
        text = page["revisions"][0]["slots"]["main"]["content"]
        box = find_template(text, r"\{\{\s*Infobox[ _](?:programming[ _]language|software|file format)?")
        paradigm = parse_paradigms(infobox_field(box, ["paradigms?"])) if box else []
        year = parse_year(infobox_field(box, ["released", "year", "first_appeared", "first appeared"])) if box else None
        result[t] = (canon, paradigm, year)
    return result


def slugify(name):
    s = name.lower()
    s = s.replace("c++", "cpp").replace("#", "sharp").replace("++", "pp").replace("+", "plus")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s or "lang"


def wiki_url(title):
    return "https://en.wikipedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_"), safe="()_,'!:-.")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache")
    ap.add_argument("--offline", action="store_true")
    ap.add_argument("--out", default=str(OUT))
    args = ap.parse_args()
    f = Fetcher(args.cache, args.offline)

    wikitext = f.get({"action": "parse", "page": LIST_PAGE, "prop": "wikitext"})["parse"]["wikitext"]
    entries = parse_list(wikitext)
    entries = [e for e in entries
               if e["title"] not in EXCLUDE_TITLES and not EXCLUDE_NAME_RE.search(e["name"])]

    tiered = [(1, i, *t) for i, t in enumerate(TIER1)] + [(2, i, *t) for i, t in enumerate(TIER2)]
    wanted = [e["title"] for e in entries] + [t[4] for t in tiered]
    info = fetch_infoboxes(f, wanted)

    def canon(title):
        title = MERGE_INTO.get(title, title)
        return info.get(title, (None,))[0] or title

    by_canon = {}
    for e in entries:
        key = canon(e["title"]) if e["title"] else "name:" + e["name"].lower()
        if key in by_canon:  # same article listed twice: merge as aliases
            prev = by_canon[key]
            if e["title"] == key and prev["title"] != key:  # keep the canonical article as primary
                prev, e = e, prev
                by_canon[key] = prev
            prev["aliases"] = [a for a in dict.fromkeys(prev["aliases"] + [e["name"]] + e["aliases"])
                               if a != prev["name"]]
            continue
        by_canon[key] = e

    langs = []
    used = set()
    tier_canons = {}
    for tier, order, slug, name, title, extra in tiered:
        c = canon(title)
        tier_canons[c] = (tier, order, slug, name, extra)

    for key, e in by_canon.items():
        t = tier_canons.pop(key, None)
        ctitle, paradigm, year = info.get(e["title"], (None, [], None)) if e["title"] else (None, [], None)
        rec = {
            "slug": None, "name": e["name"], "tier": 3, "paradigm": paradigm,
            "firstAppeared": year, "aliases": e["aliases"],
            "wikipedia": wiki_url(ctitle or e["title"]) if e["title"] else None,
            "_order": 0,
        }
        if t:
            tier, order, slug, name, extra = t
            if name != e["name"]:
                extra = [e["name"]] + extra
            rec.update(slug=slug, name=name, tier=tier, _order=order,
                       aliases=list(dict.fromkeys(extra + e["aliases"])))
            rec["paradigm"] = rec["paradigm"] or PARADIGM_FALLBACK.get(slug, [])
        langs.append(rec)

    for c, (tier, order, slug, name, extra) in tier_canons.items():  # tiered but not on the list page
        print(f"note: {name} not on list page; added from TIERS", file=sys.stderr)
        _, paradigm, year = info.get(c, (None, [], None))
        langs.append({"slug": slug, "name": name, "tier": tier, "paradigm": paradigm,
                      "firstAppeared": year, "aliases": extra, "wikipedia": wiki_url(c), "_order": order})

    # Disambiguate tier-3 names that collide with another entry (e.g. a second "Swift").
    counts = {}
    for rec in langs:
        counts[rec["name"].lower()] = counts.get(rec["name"].lower(), 0) + 1
    for rec in langs:
        if rec["tier"] == 3 and counts[rec["name"].lower()] > 1 and rec["wikipedia"]:
            title = urllib.parse.unquote(rec["wikipedia"].rsplit("/", 1)[1]).replace("_", " ")
            m = re.search(r"\(([^)]+)\)$", title)
            if m and m.group(1).lower() != "programming language":
                rec["aliases"] = [rec["name"]] + rec["aliases"]
                rec["name"] = f"{rec['name']} ({m.group(1)})"

    for rec in langs:
        seen, aliases = {rec["name"].lower()}, []
        for a in rec["aliases"]:
            if a.lower() not in seen:
                seen.add(a.lower())
                aliases.append(a)
        rec["aliases"] = aliases
        if rec["slug"]:
            used.add(rec["slug"])
    for rec in sorted(langs, key=lambda r: r["name"].lower()):
        if rec["slug"]:
            continue
        base = slugify(rec["name"])
        slug, n = base, 2
        while slug in used:
            slug, n = f"{base}-{n}", n + 1
        rec["slug"] = slug
        used.add(slug)

    langs.sort(key=lambda r: (r["tier"], r["_order"] if r["tier"] < 3 else 0, r["name"].lower()))
    for r in langs:
        del r["_order"]
    pathlib.Path(args.out).write_text(json.dumps(langs, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    counts = {t: sum(1 for r in langs if r["tier"] == t) for t in (1, 2, 3)}
    print(f"wrote {len(langs)} languages to {args.out}: {counts}")


if __name__ == "__main__":
    main()
