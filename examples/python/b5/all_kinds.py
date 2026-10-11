import inspect


def everything(a, b, /, c, d=4, *args, e, f=6, **kwargs):
    return (a, b, c, d, args, e, f, kwargs)


print(everything(1, 2, 3, e=5))
print(everything(1, 2, c=3, e=5))
print(everything(1, 2, 3, 40, 50, 60, e=5, f=7, z=0))
print(inspect.signature(everything))
