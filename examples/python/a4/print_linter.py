import ast


def find_prints(source):
    lines = []
    for node in ast.walk(ast.parse(source)):
        if (isinstance(node, ast.Call)
                and isinstance(node.func, ast.Name)
                and node.func.id == "print"):
            lines.append(node.lineno)
    return sorted(lines)
