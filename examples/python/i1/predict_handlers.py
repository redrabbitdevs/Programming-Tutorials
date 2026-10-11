def lookup(data, key):
    try:
        return data[key]
    except IndexError:
        return "index"
    except LookupError:
        return "lookup"
    except Exception:
        return "other"


print(lookup([1], 3))
print(lookup({}, "k"))
print(lookup(None, 0))
print(lookup([1, 2], 1))
