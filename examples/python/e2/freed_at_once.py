import weakref


class Buffer:
    pass


buf = Buffer()
weakref.finalize(buf, print, "buffer freed")

print("dropping the last reference")
del buf
print("after del")
