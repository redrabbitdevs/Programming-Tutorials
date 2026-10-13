import threading


@threading.synchronized_iterator
def readings(count):
    for n in range(count):
        yield n


source = readings(1000)
totals = [0] * 4


def consume(slot):
    for value in source:
        totals[slot] += value


threads = [threading.Thread(target=consume, args=(i,)) for i in range(4)]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print(sum(totals), sum(range(1000)))
