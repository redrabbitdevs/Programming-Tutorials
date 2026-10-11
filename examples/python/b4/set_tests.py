python_fans = {"Ada", "Grace", "Linus", "Guido"}

print({"Ada"} <= python_fans)
print(python_fans.isdisjoint({"Zed"}))
print(sorted(python_fans.intersection(["Ada", "Zed"])))
