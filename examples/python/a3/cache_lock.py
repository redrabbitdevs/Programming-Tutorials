import threading
import time

cache = {}
computed = []
cache_lock = threading.Lock()


def get_rate(currency):
    with cache_lock:
        if currency not in cache:
            time.sleep(0.05)               # the slow call, now safe
            computed.append(currency)
            cache[currency] = 1.08
        return cache[currency]


threads = [threading.Thread(target=get_rate, args=("EUR",)) for _ in "ab"]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print("rate computations:", len(computed))
