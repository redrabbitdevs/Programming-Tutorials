import inspect


def send(to, subject, *, cc=None, retries=3):
    return f"to {to}: {subject}"


sig = inspect.signature(send)
print(sig)
for name, param in sig.parameters.items():
    print(f"{name:8} {param.kind.name:22} {param.default!r}")


bound = sig.bind("ada@example.com", "Hi", retries=5)
bound.apply_defaults()
print(bound.arguments)
try:
    sig.bind("ada@example.com")
except TypeError as error:
    print("TypeError:", error)
