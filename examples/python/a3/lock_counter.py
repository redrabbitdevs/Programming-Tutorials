import threading

balance = 0
balance_lock = threading.Lock()


def deposit_many(times):
    global balance
    for _ in range(times):
        with balance_lock:
            balance = balance + 1


threads = [
    threading.Thread(target=deposit_many, args=(50_000,))
    for _ in range(4)
]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print("expected 200000, got", balance)
