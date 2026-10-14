import asyncio


async def ticker(count):
    for n in range(1, count + 1):
        await asyncio.sleep(0)  # wait for the next message to arrive
        yield n


async def main():
    stream = ticker(3)
    print(type(stream).__name__)
    async for n in stream:
        print("tick", n)

    squares = [n * n async for n in ticker(4)]
    evens = {n async for n in ticker(6) if n % 2 == 0}
    print(squares, sorted(evens))


asyncio.run(main())
