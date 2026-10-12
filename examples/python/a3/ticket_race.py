import threading

seats_left = 1
sold = []
both_checked = threading.Barrier(2)


def buy(customer):
    global seats_left
    if seats_left > 0:
        both_checked.wait()  # simulate an unlucky thread switch
        seats_left -= 1
        sold.append(customer)


buyers = [threading.Thread(target=buy, args=(c,)) for c in ("ann", "bob")]
for t in buyers:
    t.start()
for t in buyers:
    t.join()

print(f"tickets sold: {len(sold)}, seats left: {seats_left}")
