from concurrent.futures import ThreadPoolExecutor, as_completed


def parse_port(text):
    port = int(text)
    if not 0 < port < 65536:
        raise ValueError(f"port out of range: {port}")
    return port


inputs = ["8080", "http", "443", "70000"]
ok, failed = [], []
with ThreadPoolExecutor(max_workers=4) as pool:
    futures = {pool.submit(parse_port, text): text for text in inputs}
    for future in as_completed(futures):
        try:
            ok.append(future.result())
        except ValueError as error:
            failed.append(f"{futures[future]!r}: {error}")

print("ok:", sorted(ok))
for line in sorted(failed):
    print("failed", line)
