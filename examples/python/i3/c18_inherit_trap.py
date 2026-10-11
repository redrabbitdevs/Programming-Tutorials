class Stack(list):
    def push(self, item):
        self.append(item)

    def pop_top(self):
        return self.pop()


s = Stack()
s.push(1)
s.push(2)
s.insert(0, 99)  # a list method, now part of the Stack's public face
print(list(s))
