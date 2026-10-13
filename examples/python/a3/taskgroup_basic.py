import asyncio


async def fetch(name, delay):
    await asyncio.sleep(delay)
    return f"{name}: 200 OK"


async def main():
    async with asyncio.TaskGroup() as tg:
        home = tg.create_task(fetch("home", 0.2))
        about = tg.create_task(fetch("about", 0.1))
    # Leaving the block waited for both tasks.
    print(home.result())
    print(about.result())


asyncio.run(main())
