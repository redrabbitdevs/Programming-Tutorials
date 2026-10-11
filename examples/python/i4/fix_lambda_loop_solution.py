names = ["ada", "grace", "alan"]

greeters = [lambda: "Hello, " + name for name in names]
print([g() for g in greeters])

greeters = [lambda name=name: "Hello, " + name for name in names]
print([g() for g in greeters])
