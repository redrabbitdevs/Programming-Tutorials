import asyncio


async def fetch_user(user_id):
    await asyncio.sleep(0.1)  # waiting, not working
    return {"id": user_id, "name": "Ada"}


async def fetch_orders(user):
    await asyncio.sleep(0.1)
    return [f"order-{user['id']}-{n}" for n in (1, 2)]


async def main():
    user = await fetch_user(42)
    orders = await fetch_orders(user)
    print(user["name"], orders)


asyncio.run(main())
