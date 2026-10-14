import pickle


class Surprise:
    def __reduce__(self):
        # "To rebuild me, call print with this argument."
        return (print, ("unpickling ran code chosen by the sender",))


data = pickle.dumps(Surprise())
print("the payload names a function:", b"print" in data)
print("loading it...")
result = pickle.loads(data)
print("loads returned", result)
