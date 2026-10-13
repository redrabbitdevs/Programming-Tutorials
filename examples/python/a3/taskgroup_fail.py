import asyncio


async def slow_download():
    try:
        await asyncio.sleep(10)
        return "big file"
    except asyncio.CancelledError:
        print("download cancelled, cleaning up")
        raise


async def broken_parser():
    await asyncio.sleep(0)
    raise ValueError("bad header")


async def main():
    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(slow_download())
            tg.create_task(broken_parser())
    except* ValueError as group:
        print("failed:", [str(e) for e in group.exceptions])


asyncio.run(main())
