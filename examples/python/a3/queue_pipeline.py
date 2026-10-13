import queue
import threading

jobs = queue.Queue()
done = queue.Queue()
STOP = None


def worker():
    while (word := jobs.get()) is not STOP:
        done.put(word.upper())


workers = [threading.Thread(target=worker) for _ in range(3)]
for w in workers:
    w.start()
for word in ["pear", "fig", "kiwi", "plum", "lime"]:
    jobs.put(word)
for _ in workers:
    jobs.put(STOP)  # one stop signal per worker
for w in workers:
    w.join()

print(sorted(done.get() for _ in range(done.qsize())))
