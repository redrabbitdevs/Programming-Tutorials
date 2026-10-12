from dataclasses import dataclass
from functools import cache


@dataclass(frozen=True)
class Query:
    table: str
    columns: tuple
    flags: frozenset

    def __post_init__(self):
        object.__setattr__(self, "columns", tuple(self.columns))
        object.__setattr__(self, "flags", frozenset(self.flags))


@cache
def run(query):
    print("running", query.table, query.columns, sorted(query.flags))
    return len(query.columns)


q1 = Query("users", ["id", "name"], ["active", "admin"])
q2 = Query("users", ("id", "name"), {"admin", "active"})
print(run(q1), run(q2), q1 == q2)
print("cache hits:", run.cache_info().hits)
