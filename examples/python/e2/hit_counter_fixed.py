import threading

hits = {}
hits_lock = threading.Lock()


def record(path):
    with hits_lock:
        hits[path] = hits.get(path, 0) + 1


def worker():
    for _ in range(10_000):
        record("/home")


threads = [threading.Thread(target=worker) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(hits)
