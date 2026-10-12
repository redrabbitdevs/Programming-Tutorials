from contextlib import ExitStack

with ExitStack() as stack:
    stack.callback(print, "registered first, runs last")

    @stack.callback
    def tidy():
        print("registered second, runs first")

    print("inside the block")
print("after the block")
