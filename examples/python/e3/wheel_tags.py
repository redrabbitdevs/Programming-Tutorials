def parse_wheel(filename):
    """Split a wheel filename into name, version and its three tags."""
    stem = filename.removesuffix(".whl")
    name, version, *_build, python, abi, platform = stem.split("-")
    return name, version, python, abi, platform


FILES = [
    "tinyclock-0.1.0-py3-none-any.whl",
    "fastgeo-2.1.0-cp315-cp315-manylinux_2_28_x86_64.whl",
    "fastgeo-2.1.0-cp315-cp315t-manylinux_2_28_x86_64.whl",
    "fastgeo-2.1.0-cp312-abi3-win_amd64.whl",
    "fastgeo-2.1.0-1-cp312-abi3-win_amd64.whl",
]
for filename in FILES:
    name, version, python, abi, platform = parse_wheel(filename)
    print(f"{name:<10}{version:<7}{python:<6}{abi:<7}{platform}")
