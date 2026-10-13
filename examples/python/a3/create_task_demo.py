import asyncio


async def brew(drink, steps):
    for step in range(1, steps + 1):
        await asyncio.sleep(0)
    print(drink, "ready")
    return drink


async def main():
    tea = asyncio.create_task(brew("tea", 3))
    coffee = asyncio.create_task(brew("coffee", 1))
    print("both tasks scheduled")
    print("got", await tea)
    print("got", await coffee)


asyncio.run(main())
