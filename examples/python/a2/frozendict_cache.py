from functools import cache


@cache
def connect(options):
    print("connecting with", dict(options))
    return f"conn-{len(options)}"


a = frozendict(host="db", port=5432)
b = frozendict(port=5432, host="db")
print(connect(a), connect(b))
print("cache hits:", connect.cache_info().hits)

bad = frozendict(host="db", replicas=["r1", "r2"])
try:
    connect(bad)
except TypeError as error:
    print("TypeError:", error)
