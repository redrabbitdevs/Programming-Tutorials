import gc
import weakref


class Node:
    pass


gc.disable()               # only explicit collections from here on
a, b = Node(), Node()
a.partner, b.partner = b, a
probe = weakref.ref(a)

del a, b
print("alive after del:", probe() is not None)


def report(phase, info):
    print(phase, "generation", info["generation"])


gc.callbacks.append(report)
gc.collect()
gc.callbacks.remove(report)
print("alive after collect:", probe() is not None)
gc.enable()
