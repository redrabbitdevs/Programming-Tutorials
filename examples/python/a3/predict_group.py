import asyncio


async def check_disk():
    await asyncio.sleep(0)
    raise ValueError("disk full")


async def check_config():
    raise KeyError("port")


async def main():
    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(check_disk())
            tg.create_task(check_config())
    except* ValueError as group:
        print("ValueError:", len(group.exceptions))
    except* KeyError as group:
        print("KeyError:", len(group.exceptions))


asyncio.run(main())
