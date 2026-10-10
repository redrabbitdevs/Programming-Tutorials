#!/usr/bin/env python3
"""Check internal links and assets in the built site against the base path.

Usage: check_links.py [dist_dir] [base_path]
  dist_dir   default: site/dist
  base_path  default: /Programming-Tutorials

Fails on: root-relative links that omit the base path, links to files that do
not exist in dist, and #fragments that do not match an id in the target page.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urldefrag, urlparse

dist = Path(sys.argv[1] if len(sys.argv) > 1 else "site/dist").resolve()
base = (sys.argv[2] if len(sys.argv) > 2 else "/Programming-Tutorials").rstrip("/")

if not dist.is_dir():
    sys.exit(f"check_links: {dist} does not exist; build the site first")


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []  # (attr, value)
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "a" and a.get("name"):
            self.ids.add(a["name"])
        for key in ("href", "src"):
            if a.get(key):
                self.refs.append((tag, key, a[key]))
        if a.get("srcset"):
            for part in a["srcset"].split(","):
                if part.strip():
                    self.refs.append((tag, "srcset", part.strip().split()[0]))


pages = {}
for f in dist.rglob("*.html"):
    c = Collector()
    c.feed(f.read_text(encoding="utf-8", errors="replace"))
    pages[f] = c


def resolve(path_in_site: str):
    """Map a site path (after the base) to a file in dist, or None."""
    rel = unquote(path_in_site).lstrip("/")
    cand = dist / rel
    if cand.is_file():
        return cand
    if cand.is_dir() and (cand / "index.html").is_file():
        return cand / "index.html"
    if (dist / (rel + ".html")).is_file():
        return dist / (rel + ".html")
    return None


errors = []
checked = 0
for page, c in pages.items():
    rel_page = page.relative_to(dist).as_posix()
    page_url_path = "/" + (rel_page[: -len("index.html")] if rel_page.endswith("index.html") else rel_page)
    for tag, attr, raw in c.refs:
        raw = raw.strip()
        if not raw or raw.startswith(("mailto:", "tel:", "data:", "javascript:")):
            continue
        parsed = urlparse(raw)
        if parsed.scheme or parsed.netloc:
            continue  # external
        checked += 1
        target, frag = urldefrag(raw)
        target = urlparse(target).path
        if target == "":
            site_path = page_url_path
            target_file = page
        else:
            if target.startswith("/"):
                if not (target == base or target.startswith(base + "/")):
                    errors.append(f"{rel_page}: <{tag} {attr}> '{raw}' is missing the base path {base}")
                    continue
                site_path = target[len(base):] or "/"
            else:
                # relative link: resolve against this page's URL
                parts = (page_url_path.rstrip("/") + "/" + target).split("/") if page_url_path.endswith("/") else (page_url_path.rsplit("/", 1)[0] + "/" + target).split("/")
                out = []
                for p in parts:
                    if p == "..":
                        if out:
                            out.pop()
                    elif p not in ("", "."):
                        out.append(p)
                site_path = "/" + "/".join(out) + ("/" if target.endswith("/") else "")
            target_file = resolve(site_path)
            if target_file is None:
                errors.append(f"{rel_page}: <{tag} {attr}> '{raw}' points to nothing in dist")
                continue
        if frag and target_file.suffix == ".html":
            ids = pages.get(target_file).ids if target_file in pages else set()
            if unquote(frag) not in ids and frag not in ids:
                errors.append(f"{rel_page}: '{raw}' has no matching id #{frag}")

print(f"check_links: {len(pages)} pages, {checked} internal references checked")
if errors:
    for e in sorted(set(errors)):
        print("  ERROR", e)
    print(f"check_links: {len(set(errors))} problem(s)")
    sys.exit(1)
print("check_links: OK")
