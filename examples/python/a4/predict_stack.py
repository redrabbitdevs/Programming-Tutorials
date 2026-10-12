from contextlib import ExitStack, suppress

with ExitStack() as stack:
    stack.callback(print, "A")
    stack.enter_context(suppress(KeyError))
    stack.callback(print, "B")
    print("start")
    {}["missing"]
    print("never")
print("done")
