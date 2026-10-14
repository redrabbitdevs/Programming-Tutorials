import random

random.seed(7)
CUSTOMERS = [(i, f"customer-{i:04d}") for i in range(2_000)]
ORDERS = [(random.randrange(2_000), random.randrange(1, 500))
          for _ in range(20_000)]


def customer_name(cid):
    for key, name in CUSTOMERS:           # linear scan per order
        if key == cid:
            return name
    raise KeyError(cid)


def build_report(orders):
    totals = {}
    for cid, cents in orders:
        name = customer_name(cid)
        totals[name] = totals.get(name, 0) + cents
    top = sorted(totals.items(), key=lambda kv: -kv[1])[:3]
    return [f"{name}: {cents / 100:.2f}" for name, cents in top]


if __name__ == "__main__":
    print("\n".join(build_report(ORDERS)))
