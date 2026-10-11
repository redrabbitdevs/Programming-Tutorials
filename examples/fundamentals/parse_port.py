def parse_port(text):
    text = text.strip()
    if not text.isdigit():
        raise ValueError(f"not a whole number: {text!r}")
    port = int(text)
    if not 1 <= port <= 65535:
        raise ValueError(f"port out of range: {port}")
    return port


for text in ["8080", " 22 ", "0", "abc", "70000", "-5"]:
    try:
        print(repr(text), "->", parse_port(text))
    except ValueError as error:
        print(repr(text), "-> error:", error)
