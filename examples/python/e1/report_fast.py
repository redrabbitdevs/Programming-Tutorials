import sys
import timeit

from report_slow import CUSTOMERS, ORDERS, build_report

NAMES = dict(CUSTOMERS)                   # built once: id -> name


def build_report_fast(orders):
    totals = {}
    for cid, cents in orders:
        name = NAMES[cid]                 # one hash lookup
        totals[name] = totals.get(name, 0) + cents
    top = sorted(totals.items(), key=lambda kv: -kv[1])[:3]
    return [f"{name}: {cents / 100:.2f}" for name, cents in top]


slow = min(timeit.repeat(lambda: build_report(ORDERS), number=1, repeat=2))
fast = min(timeit.repeat(lambda: build_report_fast(ORDERS),
                         number=1, repeat=2))
print("same report:", build_report_fast(ORDERS) == build_report(ORDERS))
print("at least 5x faster:", slow > 5 * fast)
print(f"measured: {slow / fast:.0f}x faster", file=sys.stderr)
