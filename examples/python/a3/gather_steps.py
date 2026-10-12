import asyncio


async def count_down(name, start):
    for n in range(start, 0, -1):
        print(name, n)
        await asyncio.sleep(0)  # let the other coroutines run
    return f"{name} done"


async def main():
    results = await asyncio.gather(
        count_down("A", 3),
        count_down("B", 2),
    )
    print(results)


asyncio.run(main())
