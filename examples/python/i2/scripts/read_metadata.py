# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "humanize",
#     "rich>=13",
# ]
# ///
import tomllib
from pathlib import Path


def read_script_block(source):
    """Return the TOML inside the '# /// script' block as a dict, or None."""
    lines = source.splitlines()
    if "# /// script" not in lines:
        return None
    start = lines.index("# /// script") + 1
    body = []
    for line in lines[start:]:
        if line == "# ///":
            break
        body.append(line.removeprefix("# ").removeprefix("#"))
    return tomllib.loads("\n".join(body))


metadata = read_script_block(Path(__file__).read_text(encoding="utf-8"))
print("requires-python:", metadata["requires-python"])
for requirement in metadata["dependencies"]:
    print("needs", requirement)
