import asyncio


async def connect():
    await asyncio.sleep(0)
    return asyncio.get_running_loop()


async def query(sql):
    await asyncio.sleep(0)
    return asyncio.get_running_loop(), f"rows for {sql!r}"


with asyncio.Runner() as runner:
    first_loop = runner.run(connect())
    second_loop, rows = runner.run(query("SELECT 1"))

print(rows)
print("same loop:", first_loop is second_loop)
