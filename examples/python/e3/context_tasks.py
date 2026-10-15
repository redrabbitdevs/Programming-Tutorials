import asyncio
import contextvars

current = "-"  # a plain global, shared by every task
request_id = contextvars.ContextVar("request_id", default="-")


async def handle(rid):
    global current
    current = rid
    token = request_id.set(rid)
    await asyncio.sleep(0)  # the other request runs here
    print(f"{rid}: global says {current}, ContextVar says {request_id.get()}")
    request_id.reset(token)


async def main():
    async with asyncio.TaskGroup() as tg:
        tg.create_task(handle("req-1"))
        tg.create_task(handle("req-2"))
    print("after both:", request_id.get())


asyncio.run(main())
