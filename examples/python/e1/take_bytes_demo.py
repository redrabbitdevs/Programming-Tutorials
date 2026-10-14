buffer = bytearray(b"GET /index\nHost: example\npartial")

line = buffer.take_bytes(buffer.find(b"\n") + 1)   # first n bytes
print(line, type(line).__name__)
print(buffer)

rest = buffer.take_bytes()                         # everything
print(rest)
print("buffer now empty:", len(buffer) == 0)
