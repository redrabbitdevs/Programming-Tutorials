from contextlib import ExitStack

with ExitStack() as stack:
    stack.callback(print, "undo the first step")
    stack.callback(print, "undo the second step")
    print("working")
