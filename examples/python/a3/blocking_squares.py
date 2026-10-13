import asyncio
import time


def slow_square(n):
    time.sleep(0.2)  # a blocking call we cannot change
    return n * n


async def main():
    squares = await asyncio.gather(
        *(asyncio.to_thread(slow_square, n) for n in range(1, 5))
    )
    print(squares)


asyncio.run(main())
