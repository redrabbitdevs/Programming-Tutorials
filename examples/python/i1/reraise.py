def read_port(text):
    try:
        return int(text)
    except ValueError:
        print("log: bad port text", repr(text))
        raise


try:
    read_port("80a")
except ValueError as error:
    print("caller saw:", error)
