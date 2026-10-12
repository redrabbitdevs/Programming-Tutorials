import ast

source = """
def area(w, h):
    return w * h

def greet(name, greeting="Hi"):
    return greeting + ", " + name
"""


class FunctionLister(ast.NodeVisitor):
    def visit_FunctionDef(self, node):
        args = ", ".join(a.arg for a in node.args.args)
        print(f"line {node.lineno}: {node.name}({args})")
        self.generic_visit(node)


FunctionLister().visit(ast.parse(source))
