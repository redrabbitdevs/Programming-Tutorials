original = "naïve café"
wrong = original.encode("utf-8").decode("latin-1")
fixed = wrong.encode("latin-1").decode("utf-8")
print(fixed == original)
print(len(original), len(original.encode("utf-8")))
