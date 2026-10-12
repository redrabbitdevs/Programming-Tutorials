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


comment = '<script>alert("hi")</script>'
print(html(t"<p>{comment}</p>"))
print(f"<p>{comment}</p>")
