import ast


class PrintToLog(ast.NodeTransformer):
    def visit_Call(self, node):
        self.generic_visit(node)
        if isinstance(node.func, ast.Name) and node.func.id == "print":
            node.func = ast.Name("log", ast.Load())
        return node


tree = PrintToLog().visit(ast.parse("print(f(print('x')))"))
print(ast.unparse(tree))
