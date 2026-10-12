import time
from concurrent.futures import ThreadPoolExecutor

PAGES = {
    "/": "<h1>Home</h1>",
    "/about": "<p>About us</p>",
    "/contact": "<p>Write to us</p>",
}


def fetch(path):
    time.sleep(0.1)  # pretend to wait for the network
    return len(PAGES[path])


with ThreadPoolExecutor(max_workers=3) as pool:
    sizes = pool.map(fetch, PAGES)
    for path, size in zip(PAGES, sizes):
        print(f"{path:10} {size:3} bytes")
