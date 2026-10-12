import ast

tree = ast.parse("total = price * 2")
print(ast.dump(tree, indent=2))
