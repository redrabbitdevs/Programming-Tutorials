def parse_setting(line):
    if "=" not in line:
        raise ValueError(f"no '=' in line: {line!r}")
    name, value = line.split("=", 1)
    try:
        return name, int(value)
    except ValueError as error:
        raise ValueError(f"setting {name!r} needs a whole number") from error


for line in ["port=80", "oops", "port=x"]:
    try:
        print(parse_setting(line))
    except ValueError as error:
        print("error:", error, "| cause:", error.__cause__)
