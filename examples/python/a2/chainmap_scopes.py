from collections import ChainMap

builtins = {"print": "<built-in print>", "len": "<built-in len>"}
module = ChainMap({"x": 1, "len": 3}, builtins)
function = module.new_child({"y": 2})

print(function["x"], function["y"], function["print"], function["len"])
function["x"] = 99  # a local assignment shadows the module's x
print(function["x"], module["x"], function.maps[0])
print(function.parents == module)
