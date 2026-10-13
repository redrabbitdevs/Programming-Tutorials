import asyncio


async def add(a, b):
    await asyncio.sleep(0)
    return a + b


async def main():
    total = add(1, 2)
    print("total is a", type(total).__name__)


asyncio.run(main())
