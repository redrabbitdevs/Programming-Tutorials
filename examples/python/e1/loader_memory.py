import tracemalloc

LINES = [f"{i},sensor-{i % 50},{i % 97}.5" for i in range(50_000)]


def load_dicts(lines):
    rows = []
    for line in lines:
        rid, sensor, value = line.split(",")
        rows.append({"id": int(rid), "sensor": sensor,
                     "value": float(value)})
    return sum(r["value"] for r in rows)


def peak_of(loader):
    tracemalloc.start()
    total = loader(LINES)
    _now, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return total, peak


def load_stream(lines):
    total = 0.0
    for line in lines:
        total += float(line.rsplit(",", 1)[1])
    return total


before_total, before = peak_of(load_dicts)
after_total, after = peak_of(load_stream)
print("same total:", before_total == after_total)
print("peak at most half:", after * 2 <= before)
