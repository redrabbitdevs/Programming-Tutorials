import asyncio


async def add(a, b):
    await asyncio.sleep(0)
    return a + b


async def main():
    total = await add(1, 2)
    print("total is", total)


asyncio.run(main())
