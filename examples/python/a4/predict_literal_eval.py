import ast

for text in ["[1, 2]", "{'a': (1, 2)}", "1 + 2j", "len('abc')", "x"]:
    try:
        print(repr(ast.literal_eval(text)))
    except ValueError:
        print("ValueError")
