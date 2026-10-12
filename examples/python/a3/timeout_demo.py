import asyncio


async def slow_query():
    await asyncio.sleep(10)
    return "rows"


async def main():
    try:
        async with asyncio.timeout(0.1) as deadline:
            print(await slow_query())
    except TimeoutError:
        print("query timed out")
    print("expired:", deadline.expired())


asyncio.run(main())
