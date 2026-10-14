import tomllib

# Written by `pip lock iniconfig==2.3.1` (pip 26.2.1); the URL is shortened.
PYLOCK = """\
lock-version = "1.0"
created-by = "pip"

[[packages]]
name = "iniconfig"
version = "2.3.1"

[[packages.wheels]]
name = "iniconfig-2.3.1-py3-none-any.whl"
url = "https://files.pythonhosted.org/.../iniconfig-2.3.1-py3-none-any.whl"

[packages.wheels.hashes]
sha256 = "9121e2c1fdb355232495be3194c8dfe87ccc2d5dee45947b78e68f499790d7a7"
"""

lock = tomllib.loads(PYLOCK)
print("written by", lock["created-by"])
for package in lock["packages"]:
    hashes = [w["hashes"]["sha256"][:12] for w in package["wheels"]]
    print(f"{package['name']}=={package['version']}", hashes)
