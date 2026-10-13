import threading
from concurrent.futures import ThreadPoolExecutor


def wait_for_reply(barrier):
    barrier.wait(timeout=0.5)
    return "reply"


for workers in (3, 1):
    barrier = threading.Barrier(3)
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(wait_for_reply, barrier) for _ in range(3)]
    try:
        print(f"workers={workers}:", [f.result() for f in futures])
    except threading.BrokenBarrierError:
        print(f"workers={workers}: the three waits never overlapped")
