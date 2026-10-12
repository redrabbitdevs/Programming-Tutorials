import asyncio
from contextlib import asynccontextmanager


@asynccontextmanager
async def connection(name):
    print("connect", name)
    try:
        yield name.upper()
    finally:
        await asyncio.sleep(0)
        print("disconnect", name)


async def main():
    async with connection("db") as conn:
        print("using", conn)


asyncio.run(main())
