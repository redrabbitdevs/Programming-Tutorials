class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next


head = Node(1, Node(2, Node(3)))

head = Node(0, head)             # insert at the front: no other node moves

node = head
parts = []
while node is not None:          # follow the chain until the end
    parts.append(str(node.value))
    node = node.next
print(" -> ".join(parts))
