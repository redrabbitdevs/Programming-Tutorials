def forever(n):
    return forever(n + 1)


try:
    forever(0)
except RecursionError:
    print("RecursionError: the stack ran out of room")
