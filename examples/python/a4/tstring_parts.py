from string.templatelib import Interpolation

price = 4.5
template = t"Total: {price * 2:.2f} ({price!r})"
for part in template:
    if isinstance(part, Interpolation):
        print(part.value, part.expression, part.conversion,
              repr(part.format_spec))
    else:
        print("static:", repr(part))
