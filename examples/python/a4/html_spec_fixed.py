from html import escape
from string.templatelib import Interpolation, Template, convert


def html(template: Template) -> str:
    out = []
    for part in template:
        if isinstance(part, Interpolation):
            text = convert(part.value, part.conversion)
            out.append(escape(format(text, part.format_spec)))
        else:
            out.append(part)
    return "".join(out)


price, tag = 4.5, "<b>"
print(html(t"<td>{price:.2f}</td><td>{tag}</td>"))
