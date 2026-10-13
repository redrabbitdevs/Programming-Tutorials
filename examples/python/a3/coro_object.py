import asyncio


async def greet(name):
    print("running greet")
    return f"hello, {name}"


coro = greet("Ada")
print(type(coro).__name__)
coro.close()  # we never ran it, so close it explicitly

print(asyncio.run(greet("Ada")))
