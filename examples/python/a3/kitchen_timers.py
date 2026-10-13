import asyncio


async def timer(name, seconds):
    await asyncio.sleep(seconds)
    print(name, "done")
    return seconds


async def main():
    results = await asyncio.gather(
        timer("tea", 0.3),
        timer("toast", 0.1),
        timer("egg", 0.2),
    )
    print("results:", results)
    print("longest timer:", max(results), "s")


asyncio.run(main())
