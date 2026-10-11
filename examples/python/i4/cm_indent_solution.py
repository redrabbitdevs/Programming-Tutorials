from contextlib import contextmanager

depth = 0


def say(text):
    print("  " * depth + text)


@contextmanager
def indented():
    global depth
    depth += 1
    try:
        yield
    finally:
        depth -= 1


say("top")
with indented():
    say("one")
    with indented():
        say("two")
    say("one again")
say("top again")
