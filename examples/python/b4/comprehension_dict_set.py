words = ["apple", "Bob", "cherry", "Dee"]
print({w: len(w) for w in words})
print(sorted({w[0].lower() for w in words}))
