python_fans = {"Ada", "Grace", "Linus", "Guido"}
rust_fans = {"Linus", "Ferris", "Grace"}

print(sorted(python_fans | rust_fans))
print(sorted(python_fans & rust_fans))
print(sorted(python_fans - rust_fans))
print(sorted(python_fans ^ rust_fans))
