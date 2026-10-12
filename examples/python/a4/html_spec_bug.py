from html import escape
from string.templatelib import Interpolation, Template


def html(template: Template) -> str:
    out = []
    for part in template:
        if isinstance(part, Interpolation):
            out.append(escape(str(part.value)))
        else:
            out.append(part)
    return "".join(out)


price, tag = 4.5, "<b>"
print(html(t"<td>{price:.2f}</td><td>{tag}</td>"))
