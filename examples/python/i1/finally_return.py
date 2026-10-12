def read_port(text):
    try:
        return int(text)
    finally:
        return 8080


print(read_port("x"))
