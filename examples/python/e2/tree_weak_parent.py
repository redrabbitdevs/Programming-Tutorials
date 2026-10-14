import gc
import weakref

alive = weakref.WeakSet()


class TreeNode:
    def __init__(self, name, parent=None):
        self.name = name
        self.children = []
        self._parent = weakref.ref(parent) if parent else None
        if parent:
            parent.children.append(self)
        alive.add(self)

    @property
    def parent(self):
        return self._parent() if self._parent else None


gc.disable()
root = TreeNode("root")
leaf = TreeNode("leaf", TreeNode("branch", root))
print(leaf.parent.name, leaf.parent.parent.name)
del root, leaf
print("nodes alive:", len(alive))
gc.enable()
