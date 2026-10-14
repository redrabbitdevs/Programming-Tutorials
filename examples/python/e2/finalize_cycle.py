import gc
import weakref


class Session:
    pass


gc.disable()
s = Session()
s.me = s
weakref.finalize(s, print, "session freed")

print("step 1")
del s
print("step 2")
gc.collect()
print("step 3")
gc.enable()
