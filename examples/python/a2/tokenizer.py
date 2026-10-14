import re

TOKEN = re.compile(
    r"""
    (?P<NUMBER>\d+(?:\.\d+)?)
  | (?P<NAME>[A-Za-z_]\w*)
  | (?P<OP>[-+*/()=])
  | (?P<SKIP>\s+)
  | (?P<ERROR>.)
    """,
    re.VERBOSE,
)


def tokens(text):
    for m in TOKEN.finditer(text):
        if m.lastgroup == "SKIP":
            continue
        if m.lastgroup == "ERROR":
            raise SyntaxError(f"unexpected {m.group()!r} at {m.start()}")
        yield m.lastgroup, m.group()


print(" ".join(f"{kind}:{text}" for kind, text in tokens("rate = 2.5*(x+10)")))
try:
    list(tokens("total = 3 $ 4"))
except SyntaxError as error:
    print("SyntaxError:", error)
