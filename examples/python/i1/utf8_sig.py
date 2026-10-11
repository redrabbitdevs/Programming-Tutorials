raw = b"\xef\xbb\xbfname,age\n"

print(repr(raw.decode("utf-8")))
print(repr(raw.decode("utf-8-sig")))
