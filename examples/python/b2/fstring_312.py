names = ["Ada", "Grace"]
print(f"Hello {", ".join(names)}")

width = 10
precision = 3
value = 3.14159265
print(f"{value:{width}.{precision}f}|")

report = f"""Total: {
    sum([1, 2, 3])
}"""
print(report)
