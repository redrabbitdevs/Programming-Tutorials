import threading
import time

results = {}


def fetch(name, delay):
    time.sleep(delay)  # stands in for a network call
    results[name] = len(name)


threads = [
    threading.Thread(target=fetch, args=(name, 0.1))
    for name in ["alpha", "beta", "gamma"]
]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print(sorted(results.items()))
