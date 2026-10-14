def split_lines(buffer):
    """Remove and return every complete line in buffer."""
    lines = []
    while (n := buffer.find(b"\n")) != -1:
        lines.append(buffer.take_bytes(n + 1))
    return lines


buffer = bytearray(b"alpha\nbeta\ngam")
print(split_lines(buffer), buffer)
buffer += b"ma\n"
print(split_lines(buffer), buffer)
