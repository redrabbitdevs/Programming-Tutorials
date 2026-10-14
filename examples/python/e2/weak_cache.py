import weakref


class Image:
    def __init__(self, path):
        self.path = path


cache = weakref.WeakValueDictionary()


def load(path):
    image = cache.get(path)
    if image is None:
        image = Image(path)
        cache[path] = image
    return image


a = load("cat.png")
b = load("cat.png")
print(a is b, len(cache))
del a, b
print(len(cache))
