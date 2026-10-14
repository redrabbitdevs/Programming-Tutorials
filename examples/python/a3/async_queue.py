import asyncio

PAGES = {"/": 13, "/about": 15, "/blog": 40, "/contact": 18, "/shop": 27}
WORKERS = 2


async def producer(queue):
    for url in PAGES:
        await queue.put(url)  # waits while the queue is full
    for _ in range(WORKERS):
        await queue.put(None)  # one stop signal per worker


async def worker(queue, sizes):
    while (url := await queue.get()) is not None:
        await asyncio.sleep(0.01)  # fetch the page
        sizes[url] = PAGES[url]


async def main():
    queue = asyncio.Queue(maxsize=2)
    sizes = {}
    async with asyncio.TaskGroup() as tg:
        tg.create_task(producer(queue))
        for _ in range(WORKERS):
            tg.create_task(worker(queue, sizes))
    print(sorted(sizes.items()))
    print("total:", sum(sizes.values()))


asyncio.run(main())
