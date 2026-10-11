word = "café"
data = word.encode("utf-8")
print(len(word), len(data))
print(data)
print(data.decode("utf-8"))
