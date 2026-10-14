import ast
import sys
from pathlib import Path

# Which other layers each layer may import.
ALLOWED = {"domain": set(), "service": {"domain"}, "adapters": {"domain"}}


def imported_layer(node):
    """The shop layer an import statement points at, or None."""
    if isinstance(node, ast.ImportFrom) and node.module:
        if node.level == 1:
            return node.module.split(".")[0]
        if node.module.startswith("shop."):
            return node.module.split(".")[1]
    if isinstance(node, ast.Import):
        for alias in node.names:
            if alias.name.startswith("shop."):
                return alias.name.split(".")[1]
    return None


def check(package):
    problems = 0
    for path in sorted(Path(package).glob("*.py")):
        layer = path.stem
        if layer not in ALLOWED:
            continue
        tree = ast.parse(path.read_text(encoding="utf-8"))
        for node in ast.walk(tree):
            target = imported_layer(node)
            if target and target != layer and target not in ALLOWED[layer]:
                print(f"{path.name}:{node.lineno}: "
                      f"{layer} must not import {target}")
                problems += 1
    print(f"{package}: {problems} problem(s)")
    return problems


if __name__ == "__main__":
    package = sys.argv[1] if len(sys.argv) > 1 else "shop"
    sys.exit(1 if check(package) else 0)
