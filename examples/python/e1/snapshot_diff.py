import tracemalloc

tracemalloc.start()
before = tracemalloc.take_snapshot()

cache = {}
for i in range(20_000):
    cache[i] = f"row-{i}"                  # the line that grows
labels = [str(i) for i in range(500)]

after = tracemalloc.take_snapshot()
tracemalloc.stop()

top = after.compare_to(before, "lineno")[0]
frame = top.traceback[0]
print("biggest growth at line", frame.lineno)
print("in this file:", frame.filename.endswith("snapshot_diff.py"))
print("new blocks at least 20000:", top.count_diff >= 20_000)
