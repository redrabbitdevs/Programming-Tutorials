import threading

cache = {}
computed = []
both_missed = threading.Barrier(2)


def get_rate(currency):
    if currency not in cache:          # check ...
        both_missed.wait()             # (force the unlucky timing)
        computed.append(currency)      # an expensive call
        cache[currency] = 1.08         # ... then act
    return cache[currency]


threads = [threading.Thread(target=get_rate, args=("EUR",)) for _ in "ab"]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print("rate computations:", len(computed))
