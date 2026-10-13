import threading

items = []


def add_many(tag):
    for i in range(10_000):
        items.append((tag, i))  # one append is atomic on both builds


threads = [threading.Thread(target=add_many, args=(t,)) for t in "abcd"]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print(len(items), len(set(items)))
