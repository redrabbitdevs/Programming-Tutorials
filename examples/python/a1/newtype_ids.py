from typing import NewType

UserId = NewType("UserId", int)
OrderId = NewType("OrderId", int)


def cancel(order: OrderId) -> str:
    return f"cancelled order {order}"


uid = UserId(42)
print(uid, type(uid).__name__, uid + 1)
print(UserId)
print(cancel(OrderId(7)))
print(cancel(uid))
