import ast

text = "{'host': 'db', 'ports': [80, 443], 'debug': False}"
config = ast.literal_eval(text)
print(config["ports"], config["debug"])
try:
    ast.literal_eval("__import__('os').getcwd()")
except ValueError:
    print("ValueError: a call is not a literal")
