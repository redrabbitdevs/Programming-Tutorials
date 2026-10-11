python_fans = {"Ada", "Grace", "Linus", "Guido"}
rust_fans = {"Linus", "Ferris", "Grace"}

print(sorted(python_fans | rust_fans))
print(sorted(python_fans & rust_fans))
print(sorted(python_fans - rust_fans))
print(sorted(python_fans ^ rust_fans))

print({"Ada"} <= python_fans)
print(python_fans.isdisjoint({"Zed"}))

# Method forms accept any iterable
print(sorted(python_fans.intersection(["Ada", "Zed"])))

fs = frozenset({1, 2, 3})
print(fs, 2 in fs)
try:
    fs.add(4)
except AttributeError as error:
    print("AttributeError:", error)

rooms = {frozenset({"Ada", "Alan"}): "lab"}
print(rooms[frozenset({"Alan", "Ada"})])
