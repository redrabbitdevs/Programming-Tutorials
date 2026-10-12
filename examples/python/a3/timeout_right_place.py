import asyncio


async def main():
    try:
        async with asyncio.timeout(0.1):
            await asyncio.sleep(10)
    except TimeoutError:
        print("timed out, using cached data")
    print("carrying on")


try:
    asyncio.run(main())
except TimeoutError:
    print("TimeoutError escaped from main()")
