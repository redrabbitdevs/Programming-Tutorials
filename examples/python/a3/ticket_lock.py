import threading
import time

seats_left = 1
sold = []
seats_lock = threading.Lock()


def buy(customer):
    global seats_left
    with seats_lock:
        if seats_left > 0:
            time.sleep(0.05)  # a slow step can no longer hurt us
            seats_left -= 1
            sold.append(customer)


buyers = [threading.Thread(target=buy, args=(c,)) for c in ("ann", "bob")]
for t in buyers:
    t.start()
for t in buyers:
    t.join()

print(f"tickets sold: {len(sold)}, seats left: {seats_left}")
