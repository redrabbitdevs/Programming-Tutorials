from string.templatelib import Interpolation, Template, convert


def render(template: Template) -> str:
    out = []
    for part in template:
        match part:
            case str() as text:
                out.append(text)
            case Interpolation(value, _, conversion, spec):
                out.append(format(convert(value, conversion), spec))
    return "".join(out)


item, qty = "tea", 3
print(render(t"{qty:>3} x {item!r}"))
print(render(t"{qty:>3} x {item!r}") == f"{qty:>3} x {item!r}")
