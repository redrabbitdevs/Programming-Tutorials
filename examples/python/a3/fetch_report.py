import asyncio

FAKE_SERVERS = {  # url: (seconds to answer, what happens)
    "/home": (0.1, "ok"),
    "/news": (0.2, "ok"),
    "/shop": (0.1, "refused"),
    "/blog": (5.0, "ok"),
}


async def fetch(url):
    delay, outcome = FAKE_SERVERS[url]
    await asyncio.sleep(delay)
    if outcome == "refused":
        raise ConnectionRefusedError("connection refused")
    return 200


async def checked_fetch(url, report):
    try:
        async with asyncio.timeout(0.5):
            report[url] = f"status {await fetch(url)}"
    except TimeoutError:
        report[url] = "timed out"
    except ConnectionError as error:
        report[url] = f"error: {error}"


async def main():
    report = {}
    async with asyncio.TaskGroup() as tg:
        for url in FAKE_SERVERS:
            tg.create_task(checked_fetch(url, report))
    for url in sorted(report):
        print(f"{url:6} {report[url]}")


asyncio.run(main())
