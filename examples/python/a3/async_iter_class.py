import asyncio


class Countdown:
    def __init__(self, start):
        self.n = start

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.n == 0:
            raise StopAsyncIteration
        await asyncio.sleep(0)
        self.n -= 1
        return self.n + 1


async def main():
    print([n async for n in Countdown(3)])


asyncio.run(main())
