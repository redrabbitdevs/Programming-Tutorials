word = "café"
data = word.encode("utf-8")
print(len(word), len(data))
print(data)
print(data.decode("utf-8"))
print([ord(ch) for ch in "aé€"])
print(chr(233), chr(0x20AC), "é", "\N{GREEK SMALL LETTER LAMDA}")
print(list("hi".encode("utf-8")))
print(b"abc"[0], b"abc"[:2])
print(word.encode("latin-1"))
try:
    "€".encode("latin-1")
except UnicodeEncodeError as error:
    print("error:", error.reason)
print("€".encode("latin-1", errors="replace"))
