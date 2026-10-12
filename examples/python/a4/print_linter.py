import ast


def find_prints(source):
    lines = []
    for node in ast.walk(ast.parse(source)):
        if (isinstance(node, ast.Call)
                and isinstance(node.func, ast.Name)
                and node.func.id == "print"):
            lines.append(node.lineno)
    return sorted(lines)


source = """
import logging
print("start")
def run(items):
    for item in items:
        print(item)
    logging.info("done")
    return len(items)
"""
for line in find_prints(source):
    print(f"line {line}: avoid print(), use logging")
