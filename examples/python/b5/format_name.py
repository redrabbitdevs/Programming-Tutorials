def format_name(first, last, *, middle="", title="", last_first=False):
    """Build a display name from its parts."""
    given = f"{first} {middle}" if middle else first
    if last_first:
        name = f"{last}, {given}"
    else:
        name = f"{given} {last}"
    if title:
        name = f"{title} {name}"
    return name


print(format_name("Ada", "Lovelace"))
print(format_name("Ada", "Lovelace", middle="Augusta"))
print(format_name("Ada", "Lovelace", last_first=True))
print(format_name("Grace", "Hopper", title="Rear Admiral", middle="Brewster"))
print(format_name(last="Turing", first="Alan", last_first=True))
