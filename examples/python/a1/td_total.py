from typing import Required, TypedDict


class Filters(TypedDict, total=False):
    query: Required[str]
    limit: int
    sort: str


search: Filters = {"query": "python"}
print(search, Filters.__total__)
print(sorted(Filters.__required_keys__), sorted(Filters.__optional_keys__))
