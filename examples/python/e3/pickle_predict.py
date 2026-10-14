import pickle


class Note:
    def __init__(self, text):
        print("init:", text)
        self.text = text

    def __reduce__(self):
        return (print, ("reduce: " + self.text,))


data = pickle.dumps(Note("hello"))
print("dumped")
copy = pickle.loads(data)
print("loaded:", copy)
