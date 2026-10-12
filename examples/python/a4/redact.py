from string.templatelib import Interpolation, Template, convert


def redact(template: Template, *secrets: str) -> str:
    out = []
    for part in template:
        match part:
            case str():
                out.append(part)
            case Interpolation(_, expr, _, _) if expr in secrets:
                out.append("***")
            case Interpolation(value, _, conversion, spec):
                out.append(format(convert(value, conversion), spec))
    return "".join(out)


user, password = "ada", "hunter2"
print(redact(t"login {user} with {password}", "password"))
print(redact(t"user={user!r} token={password}", "password"))
