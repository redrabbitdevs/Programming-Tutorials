def hook_name(name):
    try:
        suffix = b"_" + name.encode("ascii")
    except UnicodeEncodeError:
        suffix = b"U_" + name.encode("punycode").replace(b"-", b"_")
    return (b"PyModExport" + suffix).decode("ascii")


for module in ["spam", "tally", "café"]:
    print(f"{module:<6} {hook_name(module)}")
