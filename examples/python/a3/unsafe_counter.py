import threading

count = 0


def bump():
    global count
    for _ in range(200_000):
        count += 1


ts = [threading.Thread(target=bump) for _ in range(4)]
for t in ts:
    t.start()
for t in ts:
    t.join()
print(count)
