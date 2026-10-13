import asyncio


async def heartbeat():
    beats = 0
    try:
        while True:
            beats += 1
            await asyncio.sleep(0)
    finally:
        print("heartbeat stopped after", beats, "beats")


async def main():
    task = asyncio.create_task(heartbeat())
    for _ in range(3):
        await asyncio.sleep(0)
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("cancelled:", task.cancelled())


asyncio.run(main())
