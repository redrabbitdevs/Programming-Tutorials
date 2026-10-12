def make_tree() -> Tree:
    return Tree([])


class Tree:
    def __init__(self, children: list[Tree]) -> None:
        self.children = children


print(make_tree.__annotations__)
print(Tree.__init__.__annotations__)
