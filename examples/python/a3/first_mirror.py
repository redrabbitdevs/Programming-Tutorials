import asyncio


async def download(mirror, delay, tg, log):
    try:
        await asyncio.sleep(delay)
    except asyncio.CancelledError:
        log["cancelled"].append(mirror)
        raise
    log["winner"] = mirror
    tg.cancel()  # we have what we need: stop the whole group


async def main():
    log = {"winner": None, "cancelled": []}
    async with asyncio.TaskGroup() as tg:
        tg.create_task(download("eu", 0.5, tg, log))
        tg.create_task(download("us", 0.1, tg, log))
        tg.create_task(download("asia", 0.9, tg, log))
    print("winner:", log["winner"])
    print("cancelled:", sorted(log["cancelled"]))


asyncio.run(main())
