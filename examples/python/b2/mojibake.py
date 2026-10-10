original = "naïve café"
data = original.encode("utf-8")
wrong = data.decode("latin-1")
print(wrong)
fixed = wrong.encode("latin-1").decode("utf-8")
print(fixed == original)
print(len(original), len(data))
