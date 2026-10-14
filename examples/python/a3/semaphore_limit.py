import threading
import time

slots = threading.BoundedSemaphore(2)  # at most two downloads at once
lock = threading.Lock()
active = peak = 0


def download(url):
    global active, peak
    with slots:
        with lock:
            active += 1
            peak = max(peak, active)
        time.sleep(0.05)  # the download itself
        with lock:
            active -= 1


threads = [threading.Thread(target=download, args=(n,)) for n in range(6)]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()
print("most at once:", peak)

try:
    slots.release()  # one release too many
except ValueError as error:
    print("ValueError:", error)
