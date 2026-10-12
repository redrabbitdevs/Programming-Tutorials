import ast


class FoldAdd(ast.NodeTransformer):
    def visit_BinOp(self, node):
        self.generic_visit(node)
        if (isinstance(node.op, ast.Add)
                and isinstance(node.left, ast.Constant)
                and isinstance(node.right, ast.Constant)):
            total = node.left.value + node.right.value
            return ast.copy_location(ast.Constant(total), node)
        return node


tree = ast.parse("timeout = 60 + 30 + extra\nlabel = 'v' + '2'")
tree = FoldAdd().visit(tree)
print(ast.unparse(tree))


code = compile(tree, "<folded>", "exec")
namespace = {"extra": 5}
exec(code, namespace)
print(namespace["timeout"], namespace["label"])
