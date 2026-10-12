import asyncio
from contextlib import AsyncExitStack, asynccontextmanager


@asynccontextmanager
async def connection(name):
    print("connect", name)
    try:
        yield name.upper()
    finally:
        await asyncio.sleep(0)
        print("disconnect", name)


async def main(names):
    async with AsyncExitStack() as stack:
        conns = [await stack.enter_async_context(connection(name))
                 for name in names]
        print("using", conns)


asyncio.run(main(["db", "cache"]))
