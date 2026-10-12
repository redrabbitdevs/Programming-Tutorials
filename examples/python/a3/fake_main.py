from concurrent import interpreters

print("module body runs as", __name__)
RATE = 3


def scale(x):
    return x * RATE  # reads a global, so the module is imported there


if __name__ == "__main__":
    interp = interpreters.create()
    print("result:", interp.call(scale, 5))
    interp.close()
