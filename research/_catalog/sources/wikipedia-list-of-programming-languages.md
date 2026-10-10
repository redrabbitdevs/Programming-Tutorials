# Wikipedia: List of programming languages

- URL: https://en.wikipedia.org/wiki/List_of_programming_languages
- API used by build.py: https://en.wikipedia.org/w/api.php?action=parse&page=List_of_programming_languages&prop=wikitext
- Infobox data: https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvslots=main&redirects=1&titles=... (50 titles per request)
- Accessed: 2026-10-10
- Retrieval: direct fetch (MediaWiki API, CC BY-SA 4.0 content)

Trimmed extract (verbatim lead of the page):

```text
This is an index to notable programming languages, in current or historical use. Dialects of
BASIC (which have their own page), esoteric programming languages, and markup languages are not
included. A programming language does not need to be imperative or Turing-complete, but must be
executable and so does not include markup languages such as HTML or XML, but does include
domain-specific languages such as SQL and its dialects.
```

Notes for later agents:

- The page is split into sections A-Z, each a `{{columns-list}}` of `* [[Article|Display]] (aliases)` lines.
- BASIC dialects are not on this page (they live on "List of BASIC dialects"), so Visual Basic (.NET)
  is added to the catalog from the tier table in build.py, not from the list.
- The API rate-limits bulk content reads (HTTP 429). build.py sleeps between requests and honours
  Retry-After; use `--cache DIR` so reruns do not refetch.
