import re

SLOW = re.compile(r"(\w+\s?)*")  # never run this on text you do not control
FAST = re.compile(r"\w+(?:\s\w+)*")
ATOMIC = re.compile(r"(?:\w+\s?)*+")

samples = ["two words", "one", "bad!"]
for pattern in (SLOW, FAST, ATOMIC):
    print([pattern.fullmatch(s) is not None for s in samples])

hostile = "a" * 100_000 + "!"
print(FAST.fullmatch(hostile), ATOMIC.fullmatch(hostile))
