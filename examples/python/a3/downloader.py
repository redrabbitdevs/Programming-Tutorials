import time
from concurrent.futures import ThreadPoolExecutor

FAKE_WEB = {
    "https://example.com/a": b"A" * 120,
    "https://example.com/b": b"B" * 80,
    "https://example.com/c": b"C" * 300,
    "https://example.com/d": b"D" * 45,
}


def download(url):
    time.sleep(0.2)  # every request takes 0.2 s
    return url, len(FAKE_WEB[url])


with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(download, FAKE_WEB))

for url, size in sorted(results, key=lambda pair: pair[1]):
    print(f"{size:4}  {url}")
print(f"{sum(size for _, size in results):4}  total")
