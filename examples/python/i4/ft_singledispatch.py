from functools import singledispatch


@singledispatch
def describe(value):
    return f"something else: {value!r}"


@describe.register
def _(value: int):
    return f"the integer {value}"


@describe.register(list)
def _(value):
    return f"a list of {len(value)} items"


@describe.register(str)
def _(value):
    return f"the text {value!r}"


print(describe(42))
print(describe([1, 2, 3]))
print(describe("hi"))
print(describe(2.5))
print(describe(True))
