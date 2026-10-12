from html import escape
from string.templatelib import Interpolation, Template


def html(template: Template) -> str:
    out = []
    for part in template:
        match part:
            case str():
                out.append(part)
            case Interpolation(value=Template() as inner):
                out.append(html(inner))
            case Interpolation(value=value):
                out.append(escape(str(value)))
    return "".join(out)


name = "Ben & Co"
greeting = t"<b>{name}</b>"
print(html(t"<p>{greeting}, welcome</p>"))
