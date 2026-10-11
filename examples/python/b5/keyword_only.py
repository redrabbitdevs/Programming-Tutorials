def connect(host, port=8080, *, timeout=5, secure=True):
    return f"{host}:{port} timeout={timeout} secure={secure}"


print(connect("example.org"))
print(connect("example.org", 9000, timeout=30))
try:
    connect("example.org", 9000, 30)
except TypeError as error:
    print("TypeError:", error)


def clamp(value, low, high, /):
    return max(low, min(value, high))


print(clamp(15, 0, 10))
try:
    clamp(value=15, low=0, high=10)
except TypeError as error:
    print("TypeError:", error)
