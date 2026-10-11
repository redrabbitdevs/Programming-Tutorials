original = "naïve café"
data = original.encode("utf-8")
wrong = data.decode("latin-1")
print(wrong)
