data = "café au lait".encode("latin-1")
print(data)

try:
    data.decode("utf-8")
except UnicodeDecodeError as error:
    print("failed:", error.reason, "at byte", error.start)

print(data.decode("utf-8", errors="replace"))
print(data.decode("latin-1"))
