lazy import no_such_module

print("A")
try:
    no_such_module.run()
except ModuleNotFoundError as exc:
    print("B", exc.name)
print("C")
